import { useState, useEffect, useRef } from "react";
import { FileLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { colorToCss } from "@/lib/utils";
import { CiFileOn} from "react-icons/ci";
import { IoMdArrowRoundDown } from "react-icons/io";

interface FileProps {
  id: string;
  layer: FileLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const File = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: FileProps) => {
  const { x, y, width, height, fill } = layer;
  const [value, setValue] = useState(layer.value || "");
  const [file, setFile] = useState<File | null>(null);
  const minWidth = 80
  const minHeight = 20

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  useEffect(() => {
    setValue(layer.value || "");
  }, [layer.value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setValue(selectedFile.name);
      updateValue(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const color = fill ? colorToCss(fill) : "white";

  return (
    <foreignObject
      x={x}
      y={y}
      width={Math.max(width, minWidth)} 
      height={Math.max(height, minHeight)} 
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            height: "80%",
            position: "relative",
          }}
        >
          <CiFileOn
            size="100%"
            color={color}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
          {file && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IoMdArrowRoundDown onClick={handleDownload} color={color} size="30%" className="text-3xl link-hover transition-all duration-300" />
            </div>
          )}
        </div>
        <div
          onClick={handleTextClick}
          style={{
            fontSize: "12px",
            color: color,
            textAlign: "center",
            wordBreak: "break-word",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "pointer",
            
          }}
        >
          {value || "Upload"}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none"}}
        onChange={handleFileChange}
      />
    </foreignObject>
  );
};
