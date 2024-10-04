"use client";

import { useCallback, useMemo, useState } from "react";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { nanoid } from "nanoid";
import { CanvasState, CanvasMode, Camera, Color, LayerTypes, Point, Side, XYWH } from "@/types/canvas";
import "@/app/globals.css";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import Chat from "./chat";
import { useHistory, useSelf, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped } from "@liveblocks/react";
import Loading from "./loading";
import { CursorsPresence } from "./cursors-presence";
import { connectionIdToColor, pointerEventToCanvasPointer, resizeBounds } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import ToolButton from "./tool-button";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";

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

    const translateSelectedLayers = useMutation(({ storage, self }, point: Point,) => {
        if (canvasState.mode !== CanvasMode.Translating) {
            return
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        }

        const liveLayers = storage.get("layers")

        for ( const id of self.presence.selection ) {
            const layer = liveLayers.get(id)

            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y,
                })
            }
        }

        setCanvaState({ mode: CanvasMode.Translating, current:point})
    }, [ canvasState ])

    const unselectLayers = useMutation(({self, setMyPresence}) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: []}, {addToHistory: true})
        }
    }, [])

    const resizeSelectedLayer = useMutation(({ storage, self}, point: Point) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
            return
        }

        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point
        )

        const liveLayers = storage.get("layers")
        const layer = liveLayers.get(self.presence.selection[0])

        if ( layer ) {
            layer.update(bounds)
        }

    }, [canvasState])

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    ) => {
        history.pause()
        setCanvaState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        })
    }, [history])

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

        if(canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(current)
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current)
        }

        setMyPresence({ cursor: current });
    }, [ canvasState, camera, resizeSelectedLayer, translateSelectedLayers]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPointer(e, camera);

            if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
                unselectLayers()
                setCanvaState({
                    mode: CanvasMode.None
                })
            } else if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvaState({
                    mode: CanvasMode.None,
                });
            }

            history.resume();
        },
        [camera, canvasState, history, insertLayer, unselectLayers]
    );

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPointer(e, camera)

        if (canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        setCanvaState({origin: point, mode: CanvasMode.Pressing})
    }, [camera, setCanvaState, CanvasMode])

    const selections = useOthersMapped((other) => other.presence.selection)

    const onLayerPointerDown = useMutation(({ self, setMyPresence }, e: React.PointerEvent, layerId: string,) => {
        if ( canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
            return
        }

        history.pause()
        e.stopPropagation()
        const point = pointerEventToCanvasPointer(e, camera)

        if(!self.presence.selection.includes(layerId)) {
            setMyPresence({selection:[layerId]}, { addToHistory: true })
        }
        setCanvaState({mode: CanvasMode.Translating, current: point})
    }, [ setCanvaState, camera, history, canvasState.mode])

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {}

        for ( const user of selections) {
            const [connectionId, selection] = user

            for ( const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }

        return layerIdsToColorSelection
    }, [selections])

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
            <div className="absolute bottom-4 right-16 bg-[var(--background-light)] rounded-md flex gap-y-1 items-center shadow-md">
                <Hint label="Zoom In" side={"top"} sideOffset={14}>
                    <Button onClick={zoomIn} size="icon" className="hover:border-[var(--foreground)] border-2 border-[var(--background-light)]">
                        <CiZoomIn className="text-2xl"></CiZoomIn>
                    </Button>
                </Hint>
                <Hint label="Zoom Out" side={"top"} sideOffset={14}>
                    <Button onClick={zoomOut} size="icon" className="hover:border-[var(--foreground)] border-2 border-[var(--background-light)]">
                        <CiZoomOut className="text-2xl"></CiZoomOut>
                    </Button>
                </Hint>
            </div>
            <SelectionTools
                camera={camera}
                setLastUsedColor={setLastUsedColor}
            ></SelectionTools>
            <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerUp={onPointerUp} onPointerDown={onPointerDown}>
                <g style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
                    {layerIds?.map((layerId) => (
                        <LayerPreview key={layerId} id={layerId} onLayerPointerDown={onLayerPointerDown} selectionColor={layerIdsToColorSelection[layerId]}></LayerPreview>
                    ))}
                    <CursorsPresence></CursorsPresence>
                    <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}></SelectionBox>
                </g>
            </svg>
        </main>
    );
};

export default Canvas;
