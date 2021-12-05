import { Point } from "./types";

export class Line {
    public constructor(private start: Point, private end: Point) {
        if (start.x === end.x) {
            if (start.y <= end.y) {
                this.start = start;
                this.end = end;
            } else {
                this.start = end;
                this.end = start;
            }
        } else {
            if (start.x <= end.x) {
                this.start = start;
                this.end = end;
            } else {
                this.start = end;
                this.end = start;
            }
        }
    }

    public hasIntersection(point: Point): boolean {
        if (point.x === this.start.x && point.x === this.end.x) {
            return this.start.y <= point.y && point.y <= this.end.y; 
        } else if (point.y === this.start.y && point.y === this.end.y) {
            return this.start.x <= point.x && point.x <= this.end.x; 
        }
        return false;
    }

    public hasIntersectionWithDiagonal(point: Point): boolean {
        if (this.hasIntersection(point)) {
            return true;
        } else {
            const distance = Math.abs((this.end.x - this.start.x) * (this.start.y - point.y) - (this.start.x - point.x) * (this.end.y - this.start.y)) 
            / 
            Math.sqrt( Math.pow((this.end.x - this.start.x), 2) + Math.pow(this.end.y - this.start.y, 2));

            const startX = Math.min(this.start.x, this.end.x);
            const endX = Math.max(this.start.x, this.end.x);
            const startY = Math.min(this.start.y, this.end.y);
            const endY = Math.max(this.start.y, this.end.y);

            return distance === 0 && point.x >= startX && point.y >= startY && point.x <= endX && point.y <= endY;
        }
    }

    public getStart(): Point {
        return this.start;
    }

    public getEnd(): Point {
        return this.end;
    }
}