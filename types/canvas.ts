export type Color ={
    r: number
    g: number
    b: number
}

export type Camera = {
    x: number;
    y: number;
    scale: number;
}

export enum LayerTypes {
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note,
}

export type RectangleLayer = {
    type: LayerTypes.Rectangle
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type EllipseLayer = {
    type: LayerTypes.Ellipse
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type PathLayer = {
    type: LayerTypes.Path
    x: number
    y: number
    width: number
    height: number
    fill: Color
    points: number[] []
    value?: string
}

export type TextLayer = {
    type: LayerTypes.Text
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type NoteLayer = {
    type: LayerTypes.Note
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type Point = {
    x: number
    y: number
}

export type XYWH = {
    x: number
    y: number
    width: number
    height: number
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
}

export type CanvasState =
    |   {
        mode:CanvasMode.None
        }
    |   {
        mode:CanvasMode.Pressing
        origin: Point
        }
    |   {
        mode:CanvasMode.SelectionNet
        origin: Point
        current?: Point
        }
    |   {
        mode:CanvasMode.Translating
        current: Point
        }
    |   {
        mode:CanvasMode.Inserting
        layerType: LayerTypes.Ellipse | LayerTypes.Rectangle | LayerTypes.Text | LayerTypes.Note
        }
    |   {
        mode:CanvasMode.Resizing
        initialBounds: XYWH
        corner: Side
        }
    |   {
        mode:CanvasMode.Pencil
        }
    

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer