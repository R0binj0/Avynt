"use client";

import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { CanvasState, CanvasMode, Camera, Color, LayerTypes, Point } from "@/types/canvas";
import "@/app/globals.css";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import Chat from "./chat";
import { useHistory, useSelf, useCanRedo, useCanUndo, useMutation, useStorage } from "@liveblocks/react";
import Loading from "./loading";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPointer } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

const MAX_LAYER = 100;

interface CanvasProps {
    boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);
    const [canvasState, setCanvaState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation(
        ({ storage, setMyPresence }, layerType: LayerTypes.Ellipse | LayerTypes.Rectangle | LayerTypes.Text | LayerTypes.Note, position: Point) => {
            const liveLayers = storage.get("layers");

            if (liveLayers.size >= MAX_LAYER) {
                return;
            }

            const liveLayersIds = storage.get("layerIds");
            const layerId = nanoid();
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: lastUsedColor,
            });
            liveLayersIds.push(layerId);
            liveLayers.set(layerId, layer);
            setMyPresence({ selection: [layerId] }, { addToHistory: true });
            setCanvaState({ mode: CanvasMode.None });
        },
        [lastUsedColor]
    );

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
            scale: camera.scale,
        }));
    }, []);

    const zoomIn = () => {
        setCamera((camera) => ({
            ...camera,
            scale: Math.min(camera.scale * 1.1, 5),
        }));
    };

    const zoomOut = () => {
        setCamera((camera) => ({
            ...camera,
            scale: Math.max(camera.scale * 0.9, 0.5),
        }));
    };

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPointer(e, camera);
        setMyPresence({ cursor: current });
    }, [camera]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPointer(e, camera);

            if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvaState({
                    mode: CanvasMode.None,
                });
            }

            history.resume();
        },
        [camera, canvasState, history, insertLayer]
    );

    const currentUser = useSelf((me) => me.info);

    if (!currentUser) {
        return <Loading></Loading>;
    }

    return (
        <main className="h-full w-full relative touch-none sitegrid">
            <Info boardId={boardId}></Info>
            <Toolbar
                canvasState={canvasState}
                setCanvaState={setCanvaState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            ></Toolbar>
            <Participants></Participants>
            <Chat boardId={boardId}></Chat>

            <div className="absolute bottom-4 right-4 flex">
                <button className="p-2" onClick={zoomIn}>
                    Zoom In
                </button>
                <button className="p-2" onClick={zoomOut}>
                    Zoom Out
                </button>
            </div>

            <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerUp={onPointerUp}>
                <g style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
                    {layerIds?.map((layerId) => (
                        <LayerPreview key={layerId} id={layerId} onLayerPointerDown={() => {}} selectionColor="#000"></LayerPreview>
                    ))}
                    <CursorsPresence></CursorsPresence>
                </g>
            </svg>
        </main>
    );
};

export default Canvas;
