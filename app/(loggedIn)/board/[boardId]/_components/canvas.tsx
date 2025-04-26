"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { connectionIdToColor, findIntersectingLayersWithRectangle, pointerEventToCanvasPointer, resizeBounds, penPointsToPathLayer, colorToCss } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import Settings from "./settings";
import { Path } from "./tools/path";
import { useDisabledScrollBounce } from "@/hooks/use-disabled-scroll-bounce";
import { useDeleteLayers } from "@/hooks/use-delete-layers";

const MAX_LAYER = 100;

interface CanvasProps {
    boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);
    const pencilDraft = useSelf((me) => me.presence.pencilDraft)
    const [canvasState, setCanvaState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    useDisabledScrollBounce()

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation(
        ({ storage, setMyPresence }, layerType: LayerTypes.Route | LayerTypes.Ellipse | LayerTypes.Rectangle | LayerTypes.Text | LayerTypes.Comment | LayerTypes.Triangle | LayerTypes.Connect | LayerTypes.ToDo | LayerTypes.Link | LayerTypes.Table | LayerTypes.Image | LayerTypes.File, position: Point) => {
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
                height: layerType === LayerTypes.Link || layerType === LayerTypes.Text ? 40 : 100,
                width: layerType === LayerTypes.Link || layerType === LayerTypes.Text ? 160 : 100 || layerType === LayerTypes.ToDo ? 180 : 100,
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

    const updateSelectionNet = useMutation(({storage, setMyPresence}, current:Point, origin:Point) => {
        const layers = storage.get("layers").toImmutable()
        setCanvaState({
            mode: CanvasMode.SelectionNet,
            origin,
            current
        })

        if (!layerIds) {
            return null
        }

        const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current)

        setMyPresence({ selection:ids })
    }, [ layerIds])

    const startMultiSelection = useCallback((current:Point, origin: Point) => {
        if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
            setCanvaState({
                mode: CanvasMode.SelectionNet,
                origin,
                current
            })
        }
    },[])

    const startDrawing = useMutation((
        {setMyPresence},
        point: Point,
        pressure: number,
    ) => {
        setMyPresence({
            pencilDraft: [[point.x, point.y, pressure]],
            pencilColor: lastUsedColor,
        })
    }, [lastUsedColor])

    const insertPath = useMutation((
        {storage, self, setMyPresence},
    ) => {
        const liveLayers = storage.get("layers")
        const { pencilDraft } = self.presence

        console.log("pencilDraft", self.presence)

        if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYER) {
            setMyPresence({pencilDraft: null})
            return
        }

        const id = nanoid()
        liveLayers.set(
            id,
            new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
        )

        const liveLayerIds = storage.get("layerIds")
        liveLayerIds.push(id)
        

        setMyPresence({pencilDraft: null})
        setCanvaState({mode: CanvasMode.Pencil})
    }, [lastUsedColor])

    const continueDrawing = useMutation((
        {self, setMyPresence},
        point: Point,
        e: React.PointerEvent,
    ) => {
        const { pencilDraft } = self.presence

        if (canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft == null) {
            return
        }

        setMyPresence({
            cursor: point,
            pencilDraft:
                pencilDraft.length === 1 && 
                pencilDraft[0][0] === point.x &&
                pencilDraft[0][1] === point.y
                    ? pencilDraft
                    : [...pencilDraft, [point.x, point.y, e.pressure]]
        })
    }, [canvasState.mode])

    const resizeSelectedLayer = useMutation(({ storage, self }, point: Point) => {
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

        if (layer) {
            const minWidth = layer.get("type") === LayerTypes.Text ? 70 : layer.get("type") === LayerTypes.File ? 80 : 160
            const minHeight = layer.get("type") === LayerTypes.File ? 100 : 40

            if (layer.get("type") === LayerTypes.Link || layer.get("type") === LayerTypes.Text || layer.get("type") === LayerTypes.Comment || layer.get("type") === LayerTypes.ToDo || layer.get("type") === LayerTypes.File) {
                bounds.width = Math.max(bounds.width, minWidth)
                bounds.height = Math.max(bounds.height, minHeight)
            }
            
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
        if (e.shiftKey) {
            e.preventDefault();
            const zoomAmount = e.deltaY < 0 ? 1.1 : 0.9;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const newScale = Math.min(Math.max(camera.scale * zoomAmount, 0.5), 5);
            const newCameraX = mouseX - (mouseX - camera.x) * (newScale / camera.scale);
            const newCameraY = mouseY - (mouseY - camera.y) * (newScale / camera.scale);
            setCamera(() => ({
                x: newCameraX,
                y: newCameraY,
                scale: newScale,
            }));
        } else {
            setCamera((camera) => ({
                x: camera.x - e.deltaX,
                y: camera.y - e.deltaY,
                scale: camera.scale,
            }));
        }
    }, [camera]);

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

    const [isDragging, setIsDragging] = useState(false);
    const [cursorStyle, setCursorStyle] = useState('cursor-default');

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPointer(e, camera);

        if (isDragging) {
            setCamera((prevCamera) => ({
                x: prevCamera.x + e.movementX,
                y: prevCamera.y + e.movementY,
                scale: prevCamera.scale,
            }));
            return;
        }

        if (canvasState.mode === CanvasMode.Pressing) {
            startMultiSelection(current, canvasState.origin)
        } else if(canvasState.mode === CanvasMode.SelectionNet) {
            updateSelectionNet(current, canvasState.origin)
        } else if(canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(current)
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current)
        } else if (canvasState.mode === CanvasMode.Pencil) {
            continueDrawing(current, e)
        }

        setMyPresence({ cursor: current });
    }, [ canvasState, camera, resizeSelectedLayer, translateSelectedLayers, isDragging, continueDrawing, , startMultiSelection, updateSelectionNet ]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPointer(e, camera);

        if (e.button === 1) {
            setIsDragging(true);
            setCursorStyle('cursor-hand');
            setCanvaState({ origin: point, mode: CanvasMode.None });
            return;
        }

        if (canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        if (canvasState.mode === CanvasMode.Pencil) {
            startDrawing(point, e.pressure)
            return;
        }

        setCanvaState({origin: point, mode: CanvasMode.Pressing})
    }, [camera, setCanvaState, canvasState.mode, startDrawing])

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPointer(e, camera);

            if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
                unselectLayers()
                setCanvaState({
                    mode: CanvasMode.None
                })
            } else if (canvasState.mode === CanvasMode.Pencil) {
                insertPath()
            } else if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvaState({
                    mode: CanvasMode.None,
                });
            }

            history.resume();
            if (isDragging) {
                setIsDragging(false);
                setCursorStyle('cursor-default');
            }
        },
        [camera, canvasState, history, insertLayer, unselectLayers, isDragging, insertPath, setCanvaState, startDrawing]
    );

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

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            switch (e.key) {
                case "z": {
                    if(e.ctrlKey || e.metaKey) {
                        history.undo()
                        break
                    }
                }
                case "x" : {
                    if(e.ctrlKey || e.metaKey) {
                        history.redo()
                        break
                    }
                }
            }
        }
        
        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }

    }, [ history])

    if (!currentUser) {
        return <Loading></Loading>;
    }

    return (
        <main className={`h-full w-full relative touch-none sitegrid ${cursorStyle}`}>
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
            <div className="absolute top-2 right-1 z-50">
               <Settings boardId={boardId}></Settings> 
            </div>
            <Chat boardId={boardId}></Chat>
            <div className="absolute bottom-4 right-16 bg-[var(--background-dark)] rounded-md flex gap-y-1 items-center shadow-md">
                <Hint label="Zoom In" side={"top"} sideOffset={14}>
                    <Button onClick={zoomIn} size="icon" className="hover:border-[var(--foreground)] border-2 border-[var(--background-dark)]">
                        <CiZoomIn className="text-2xl"></CiZoomIn>
                    </Button>
                </Hint>
                <Hint label="Zoom Out" side={"top"} sideOffset={14}>
                    <Button onClick={zoomOut} size="icon" className="hover:border-[var(--foreground)] border-2 border-[var(--background-dark)]">
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
                    {pencilDraft != null && pencilDraft.length > 0 && (
                        <Path
                            points={pencilDraft}
                            fill={colorToCss(lastUsedColor)}   
                            x={0}
                            y={0}                     
                        />
                    )}
                    <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}></SelectionBox>
                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
                        <rect className="fill-blue-500/50 stroke-blue-500 stroke-1" width={Math.abs(canvasState.origin.x - canvasState.current.x)} height={Math.abs(canvasState.origin.y - canvasState.current.y)} x={Math.min(canvasState.origin.x, canvasState.current.x)} y={Math.min(canvasState.origin.y, canvasState.current.y)}></rect>
                    )}
                </g>
            </svg>
        </main>
    );
};

export default Canvas;
