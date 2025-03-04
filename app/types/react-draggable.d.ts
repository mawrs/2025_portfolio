declare module 'react-draggable' {
  import * as React from 'react';

  export interface DraggableData {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
  }

  export interface DraggableEventHandler {
    (e: MouseEvent, data: DraggableData): void | false;
  }

  export interface DraggableProps {
    axis?: 'both' | 'x' | 'y' | 'none';
    bounds?: 'parent' | {left?: number, top?: number, right?: number, bottom?: number} | string;
    defaultClassName?: string;
    defaultClassNameDragging?: string;
    defaultClassNameDragged?: string;
    defaultPosition?: {x: number, y: number};
    disabled?: boolean;
    grid?: [number, number];
    handle?: string;
    offsetParent?: HTMLElement;
    onMouseDown?: (e: MouseEvent) => void;
    onStart?: (e: MouseEvent, data: DraggableData) => void | false;
    onDrag?: (e: MouseEvent, data: DraggableData) => void | false;
    onStop?: (e: MouseEvent, data: DraggableData) => void | false;
    position?: {x: number, y: number};
    positionOffset?: {x: number | string, y: number | string};
    scale?: number;
    children?: React.ReactNode;
  }

  export default class Draggable extends React.Component<DraggableProps> {}
} 