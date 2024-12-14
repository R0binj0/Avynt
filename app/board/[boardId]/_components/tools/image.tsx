import { ImageLayer } from "@/types/canvas"
import { useState } from "react"
import { Upload } from "lucide-react"
import { colorToCss } from "@/lib/utils"

interface ImageProps{
    id: string
    layer: ImageLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

const ImageUpload = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:ImageProps) => {
    const { x, y, width, height, fill } = layer;

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLabelHovering, setIsLabelHovering] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        onPointerDown(e, id);
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={handlePointerDown}
            style={{ pointerEvents: 'none' }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    border: selectionColor ? `2px solid ${selectionColor}` : 'none',
                    overflow: 'hidden',
                    pointerEvents: 'auto',
                    borderRadius: '8px',
                    backgroundColor: colorToCss(fill),
                    backdropFilter: 'blur(5px)',
                }}
            >
                {!imageUrl ? (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: 'var(--text)',
                            fontSize: '14px',
                            fontWeight: 500,
                            border: '1px solid #000',
                            borderRadius: '8px'
                        }}
                    >
                        
                        <label 
                            htmlFor={`image-upload-${id}`} 
                            style={{ 
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={() => setIsLabelHovering(true)}
                            onMouseLeave={() => setIsLabelHovering(false)}
                        >
                            <Upload size={24} className="mb-2 self-center" />
                            <span
                                style={{
                                    position: 'relative',
                                    display: 'inline-block'
                                }}
                            >
                                Upload Image
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: '-2px',
                                        left: '0',
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: 'var(--text)',
                                        transform: isLabelHovering ? 'scaleX(1)' : 'scaleX(0)',
                                        transition: 'transform 0.3s ease',
                                        transformOrigin: 'center'
                                    }}
                                />
                            </span>
                        </label>
                        <input
                            id={`image-upload-${id}`}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none'}}
                        />
                    </div>
                ) : (
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none',
                        }}
                        draggable={false}
                    />
                )}
            </div>
        </foreignObject>
    );
}

export default ImageUpload;
