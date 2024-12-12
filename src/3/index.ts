import { readFullFileStrings } from "@/utils/input";
import { print } from "@/utils/output";

/** https://adventofcode.com/2021/day/3 */

async function main() {
    const data = await readFullFileStrings(__dirname);
    const gamma = calculateGamma(data);
    const epsilon = binaryInvert(gamma);
    print (`Gamma*Epsilon: ${gamma * epsilon}`);

    const oxygen = calculateOxygenGeneratorRating(data);
    const co2 = calculateCO2Rating(data);
    print (`Oxygen*CO2 Rating: ${oxygen * co2}`);

}

function calculateGamma(data: string[]): number {
    if (!data.length) {
        return 0;
    }
    const columnsCount = data[0].length;
    const counts = data.reduce((result, row) => {
        for (let i = 0; i < row.length; ++i) {
            const char = row[i];
            if (Number(char) === 1) {
                ++result[i];
            }
        }
        return result;
    }, (new Array(columnsCount) as number[]).fill(0));
    console.log(counts);
    const size = data.length;
    const half = Math.floor(size / 2);
    const gammaBinary = counts.map((count) => {
        return count > half ? '1' : '0';
    }).join('');
    return binaryToDecimal(gammaBinary);
}

function binaryToDecimal(binary: string): number {
    return parseInt(binary, 2);
}

function binaryInvert(value: number): number {
    return value ^ parseInt((new Array(value.toString(2).length + 1)).join('1'), 2 );
}

function calculateOxygenGeneratorRating(data: string[]): number {
    return calculateRating(data, true);
}

function calculateCO2Rating(data: string[]): number {
    return calculateRating(data, false);
}

function calculateRating(data: string[], isMostCommon: boolean): number {
    let index = 0;
    let currentData = [...data];
    const columnsCount = data[0].length;
    while (index < columnsCount) {
        if (currentData.length <= 1) {
            break;
        }
        const data0 = [];
        const data1 = [];
        for (let i = currentData.length - 1; i >= 0; --i) {
            const row = currentData[i];
            const char = Number(row[index]);
            if (char === 1) {
                data1.push(currentData.pop()!);
            } else {
                data0.push(currentData.pop()!);
            }
        }
        if (isMostCommon) {
            if (data1.length >= data0.length) {
                currentData = data1;
            } else {
                currentData = data0;
            }
        } else {
            if (data1.length < data0.length) {
                currentData = data1;
            } else {
                currentData = data0;
            }
        }
        ++index;
    }
    return currentData[0] ? binaryToDecimal(currentData[0]) : 0;
}

main();