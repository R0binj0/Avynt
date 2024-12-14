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
    Triangle,
    Path,
    Text,
    Comment,
    Connect,
    ToDo,
    Link,
    Table,
    Image,
    File,
    Route,
}

export type RouteLayer = {
    type: LayerTypes.Route
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
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
    fontSize?: number
}

export type CommentLayer = {
    type: LayerTypes.Comment
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type TriangleLayer = {
    type: LayerTypes.Triangle
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type ConnectLayer = {
    type: LayerTypes.Connect
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type ToDoLayer = {
    type: LayerTypes.ToDo
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
    items?: Array<{ text: string; checked: boolean }>
}

export type LinkLayer = {
    type: LayerTypes.Link
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
    url?: string
}

export type TableLayer = {
    type: LayerTypes.Table
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
    rows?: number
    cols?: number
}

export type ImageLayer = {
    type: LayerTypes.Image
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type FileLayer = {
    type: LayerTypes.File
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
        origin?: Point 
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
        layerType: LayerTypes.Route | LayerTypes.Ellipse | LayerTypes.Rectangle | LayerTypes.Text | LayerTypes.Comment | LayerTypes.Triangle | LayerTypes.ToDo | LayerTypes.Connect | LayerTypes.Link | LayerTypes.Table | LayerTypes.Image | LayerTypes.File
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

export type Layer = RouteLayer | RectangleLayer | EllipseLayer | PathLayer | TextLayer | CommentLayer | TriangleLayer | ConnectLayer | ToDoLayer | LinkLayer | TableLayer | ImageLayer | FileLayer
