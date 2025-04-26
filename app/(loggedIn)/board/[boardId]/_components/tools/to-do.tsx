import { useState, useEffect, useRef } from "react";
import { ToDoLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { colorToCss } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface ToDoProps {
  id: string;
  layer: ToDoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

interface TodoItem {
  text: string;
  checked: boolean;
}

export const ToDo = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: ToDoProps) => {
  const { x, y, width, fill, value } = layer;
  const [items, setItems] = useState<TodoItem[]>([]);
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (value) {
      try {
        setItems(JSON.parse(value));
      } catch (e) {
        console.error("Failed to parse todo items:", e);
        setItems([{ text: "", checked: false }]);
      }
    } else {
      setItems([{ text: "", checked: false }]);
    }
  }, [value]);

  const updateValue = useMutation(({ storage }, newItems: TodoItem[]) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", JSON.stringify(newItems));
  }, []);

  const handleItemChange = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index].text = text;
    setItems(newItems);
    updateValue(newItems);
  };

  const handleCheckboxChange = (index: number) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
    updateValue(newItems);
  };

  const addNewItem = () => {
    const newItems = [...items, { text: "", checked: false }];
    setItems(newItems);
    updateValue(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    updateValue(newItems);
  };

  const updateLayerHeight = useMutation(({ storage }, newHeight: number) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("height", newHeight);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const newHeight = containerRef.current.offsetHeight;
      setHeight(newHeight);
      updateLayerHeight(newHeight);
    }
  }, [items, updateLayerHeight]);

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <div
        ref={containerRef}
        className="p-2 bg-white rounded-md shadow-md flex flex-col gap-2"
        style={{ 
            borderRadius: '8px',
            backgroundColor: colorToCss(fill),
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 border-b border-[var(--background-dark)]">
            <Checkbox
              checked={item.checked}
              className="w-6 h-6 checked:bg-blue-500"
              onCheckedChange={() => handleCheckboxChange(index)}
            />
            <Input
              value={item.text}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="flex-grow border-none"
              placeholder="Add a task..."
            />
            <button
              onClick={() => removeItem(index)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16}  className="hover:text-red-500/50"/>
            </button>
          </div>
        ))}
        <button
          onClick={addNewItem}
          className={`flex items-center gap-2 text-sm text-gray-500 hover:text-gray-500/70 transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Plus size={16} />
          Add new item
        </button>
      </div>
    </foreignObject>
  );
};
