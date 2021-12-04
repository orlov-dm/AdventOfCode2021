import { readFullFileNumbers } from "../utils/input";
import { print } from "../utils/output";

/** https://adventofcode.com/2021/day/1 */
async function main() {
    const data = await readFullFileNumbers(__dirname);
    print(countIncreases(data));
    print(countByThrees(data));
}

function countIncreases(numbers: number[]) {
    let count = 0;
    numbers.forEach((value, index, arr) => {
        if (!index) {
            return;
        }
        if (value > arr[index - 1]) {
            ++count;
        }
    });
    return count;
}

function countByThrees(numbers: number[]) {
    let sumPack = sum(numbers, 0, 3);
    let count = 0;
    let prevSumPack = sumPack;
    for (let i = 1; i < numbers.length - 2; ++i) {
        const prevValue = numbers[i - 1];
        const currValue = numbers[i + 2];
        sumPack += currValue - prevValue;
        if (sumPack > prevSumPack) {
            ++count;
        }
        prevSumPack = sumPack;
    }
    return count;
}

function sum(numbers: number[], start: number, end: number) {
    return numbers.slice(start, end).reduce((sum, value) => sum += value, 0);
}

main();