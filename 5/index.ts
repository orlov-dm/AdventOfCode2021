import { readFullFileStrings } from "../utils/input";
import { print } from "../utils/output";
import { Line } from "./Line";

/** https://adventofcode.com/2021/day/5 */

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

const POINTS_IS_DANGEROUS_VALUE = 2;

async function main() {
    const data = await readFullFileStrings(__dirname);
    const lines = generateLines(data);

    const intersectionsCount = fillIntersections(lines, false);
    const dangerousPointsCount = countDangerousPoints(intersectionsCount);
    print ('Dangerous Points: ' + dangerousPointsCount);
    const intersectionsWithDiagonalCount = fillIntersections(lines, true);
    const dangerousPointsWithDiagonalCount = countDangerousPoints(intersectionsWithDiagonalCount);
    print ('Dangerous Points, concidering diagonals: ' + dangerousPointsWithDiagonalCount);

}

function createLineFromString(data: string): Line | null {
    if (!data.length) {
        return null;
    }

    const [startData, endData] = data.split(' -> ');
    const [x1, y1] = startData.split(',');
    const [x2, y2] = endData.split(',');

    return new Line (
        {x: Number(x1), y: Number(y1)},
        {x: Number(x2), y: Number(y2)}
    );
}

function generateLines(data: string[]): Line[] {
    const lines = [] as Line[];
    
    data.forEach((lineData) => {
        const line = createLineFromString(lineData);
        if (!line) {
            return;
        }
        lines.push(line);

        updateConstraints(line);
    });

    return lines;
}

function updateConstraints(line: Line) {
    const start = line.getStart();
    const end = line.getEnd();
    minX = Math.min(start.x, minX);
    minY = Math.min(start.y, minY);
    maxX = Math.max(end.x, maxX);
    maxY = Math.max(end.y, maxY);
}

function fillIntersections(lines: Line[], withDiagonal: boolean) : number[][] {
    const intersectionsCount = [] as number[][];
    for (let i = minX; i <= maxX; ++i) {
        if (intersectionsCount[i] === undefined) {
            intersectionsCount[i] = [];
        }
        for (let j = minY; j <= maxY; ++j) {
            const point = {
                x: i,
                y: j,
            };
            for (const line of lines) {
                if (!withDiagonal && line.hasIntersection(point) || withDiagonal && line.hasIntersectionWithDiagonal(point)) {
                    const newCount = (intersectionsCount[i][j] || 0) + 1;
                    intersectionsCount[i][j] = newCount;
                    if (newCount >= POINTS_IS_DANGEROUS_VALUE) {
                        break;
                    }
                }
            };
        }
    }
    return intersectionsCount;
}

function countDangerousPoints(intersectionsCount: number[][]) {
    return intersectionsCount.reduce((sum, row) => {
        const rowSum = row.reduce((rowSum, rowValue) => {
            return rowValue >= POINTS_IS_DANGEROUS_VALUE ? rowSum + 1 : rowSum;
        }, 0);
        return sum + rowSum;
    }, 0);
}

main();