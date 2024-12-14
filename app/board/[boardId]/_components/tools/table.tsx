import { useState, useEffect, useRef } from "react";
import { TableLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { colorToCss } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableProps {
  id: string;
  layer: TableLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const BASE_MIN_WIDTH = 200;
const BASE_MIN_HEIGHT = 100;
const MIN_CELL_WIDTH = 60;
const MIN_CELL_HEIGHT = 50;

export const Table = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TableProps) => {
  const { x, y, width, height, fill, value } = layer;
  const [tableData, setTableData] = useState<string[][]>([["", ""], ["", ""]]);
  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const minWidth = Math.max(BASE_MIN_WIDTH, tableData[0].length * MIN_CELL_WIDTH);
  const minHeight = Math.max(BASE_MIN_HEIGHT, tableData.length * MIN_CELL_HEIGHT);

  useEffect(() => {
    if (value) {
      try {
        setTableData(JSON.parse(value));
      } catch (e) {
        console.error("Failed to parse table data:", e);
      }
    }
  }, [value]);

  const updateValue = useMutation(({ storage }, newValue: string[][]) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", JSON.stringify(newValue));
  }, []);

  const updateSize = useMutation(({ storage }, newWidth: number, newHeight: number) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("width", Math.max(newWidth, minWidth));
    liveLayers.get(id)?.set("height", Math.max(newHeight, minHeight));
  }, [minWidth, minHeight]);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = tableData.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === colIndex ? value : cell)) : row
    );
    setTableData(newData);
    updateValue(newData);
  };

  const addRow = () => {
    const newRow = new Array(tableData[0].length).fill("");
    const newData = [...tableData, newRow];
    setTableData(newData);
    updateValue(newData);
    updateSize(width, Math.max(height, (newData.length * MIN_CELL_HEIGHT)));
  };

  const addColumn = () => {
    const newData = tableData.map(row => [...row, ""]);
    setTableData(newData);
    updateValue(newData);
    updateSize(Math.max(width, (newData[0].length * MIN_CELL_WIDTH)), height);
  };

  const removeRow = () => {
    if (tableData.length > 1) {
      const newData = tableData.slice(0, -1);
      setTableData(newData);
      updateValue(newData);
      updateSize(width, Math.max(BASE_MIN_HEIGHT, newData.length * MIN_CELL_HEIGHT));
    }
  };

  const removeColumn = () => {
    if (tableData[0].length > 1) {
      const newData = tableData.map(row => row.slice(0, -1));
      setTableData(newData);
      updateValue(newData);
      updateSize(Math.max(BASE_MIN_WIDTH, newData[0].length * MIN_CELL_WIDTH), height);
    }
  };

  useEffect(() => {
    if (containerRef.current && tableRef.current) {
      const containerWidth = Math.max(containerRef.current.offsetWidth, minWidth);
      const containerHeight = Math.max(containerRef.current.offsetHeight, minHeight);

      const cellWidth = Math.max(MIN_CELL_WIDTH, containerWidth / tableData[0].length);
      const cellHeight = Math.max(MIN_CELL_HEIGHT, containerHeight / tableData.length);

      const newTableData = [...tableData];
      while (newTableData[0].length * cellWidth < containerWidth - 40 && newTableData[0].length * cellWidth < containerWidth) {
        newTableData.forEach(row => row.push(""));
      }
      while (newTableData[0].length > 2 && newTableData[0].length * cellWidth > containerWidth) {
        newTableData.forEach(row => row.pop());
      }

      while (newTableData.length * cellHeight < containerHeight - 40 && newTableData.length * cellHeight < containerHeight) {
        newTableData.push(new Array(newTableData[0].length).fill(""));
      }
      while (newTableData.length > 2 && newTableData.length * cellHeight > containerHeight) {
        newTableData.pop();
      }

      if (JSON.stringify(newTableData) !== JSON.stringify(tableData)) {
        setTableData(newTableData);
        updateValue(newTableData);
      }

      if (width < minWidth || height < minHeight) {
        updateSize(Math.max(width, minWidth), Math.max(height, minHeight));
      }
    }
  }, [width, height, tableData, updateValue, updateSize, minWidth, minHeight]);

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
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colorToCss(fill),
          position: "relative",
          padding: "25px",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <table ref={tableRef} style={{ borderCollapse: "collapse", width: "100%", height: "100%" }}>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      border: "1px solid #000",
                      padding: "4px",
                      width: `${100 / row.length}%`,
                      height: `${100 / tableData.length}%`,
                    }}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        background: "transparent",
                        outline: "none",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        <div
          className={cn(
            "absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-300",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          onClick={addColumn}
        >
          <Plus size={16} className="text-gray-500 hover:text-gray-500/70"/>
        </div>
        
        <div
          className={cn(
            "absolute left-1 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-300",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          onClick={removeColumn}
        >
          <Minus size={16} className="text-gray-500 hover:text-gray-500/70"/>
        </div>
        
        <div
          className={cn(
            "absolute bottom-1 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          onClick={addRow}
        >
          <Plus size={16} className="text-gray-500 hover:text-gray-500/70"/>
        </div>
        
        <div
          className={cn(
            "absolute top-1 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          onClick={removeRow}
        >
          <Minus size={16} className="text-gray-500 hover:text-gray-500/70"/>
        </div>
      </div>
    </foreignObject>
  );
};
