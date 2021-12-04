

export enum DIRECTION {
    FORWARD,
    DOWNWARD,
    UPWARD
}

const TEXT_MAPPINGS: Record<string, DIRECTION> = {
    'forward': DIRECTION.FORWARD,
    'down': DIRECTION.DOWNWARD,
    'up': DIRECTION.UPWARD,
}

export class Command {
    public constructor(private readonly direction: DIRECTION, private readonly value: number) {}

    public static createFromString(text: string): Command | null {
        const [textDirection, textValue] = text.split(' ');
        return TEXT_MAPPINGS[textDirection] !== undefined ? 
            new Command(TEXT_MAPPINGS[textDirection], Number(textValue)) :
            null;
    }

    public getDirection() {
        return this.direction;
    }
    public getValue() {
        return this.value;
    }
}