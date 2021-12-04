import { readFullFileStrings } from "../utils/input";
import { print } from "../utils/output";
import { notEmpty } from "../utils/array";
import { DIRECTION, Command } from "./Command";

/** https://adventofcode.com/2021/day/2 */
type Coordinates = [
    x: number,
    y: number,
]

async function main() {
    const data = await readFullFileStrings(__dirname);
    const commands = generateCommands(data);
    const [x1, y1] = calculatePositionV1(commands);
    print(x1 * y1);
    const [x2, y2] = calculatePositionV2(commands);
    print(x2 * y2);
}

function generateCommands(data: string[]): Command[] {
    const commandsOrNull = data.map((value) => Command.createFromString(value));
    return commandsOrNull.filter(notEmpty);
}

function calculatePositionV1(commands: Command[]): Coordinates {
    return commands.reduce((result, command) => {
        const value = command.getValue();
        switch (command.getDirection()) {
            case DIRECTION.FORWARD:
                result[0] += value;
                break;
            /* up and down inversed due to calculating depth */
            case DIRECTION.DOWNWARD:
                result[1] += value;
                break;
            case DIRECTION.UPWARD:
                result[1] -= value;
                break;
            default:
                break;
        }
        return result;
    }, [0, 0]);
}

function calculatePositionV2(commands: Command[]): Coordinates {
    let aim = 0;
    return commands.reduce((result, command) => {
        const value = command.getValue();
        switch (command.getDirection()) {
            case DIRECTION.FORWARD:
                result[0] += value;
                result[1] += aim * value;
                break;
            /* up and down inversed due to calculating depth */
            case DIRECTION.DOWNWARD:
                aim += value;
                break;
            case DIRECTION.UPWARD:
                aim -= value;
                break;
            default:
                break;
        }
        return result;
    }, [0, 0]);
}


main();