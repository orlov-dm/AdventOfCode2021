

export class Card {
    private rowSets: Set<number>[] = [];
    private columnSets: Set<number>[] = [];
    private isWinnerCache: boolean = false;
    
    public constructor(data: number[][]) {
        const FIELD_SIZE = data.length;
        for (let i = 0; i < FIELD_SIZE; ++i) {
            this.columnSets.push(new Set());
        }
        for (let i = 0; i < FIELD_SIZE; ++i) {
            this.rowSets.push(new Set(data[i]));

            for (let j = 0; j < FIELD_SIZE; ++j) {
                this.columnSets[j].add(data[i][j]);
            }
        }
    }

    public mark(value: number) {
        this.rowSets.forEach(set => set.has(value) ? set.delete(value) : null);
        this.columnSets.forEach(set => set.has(value) ? set.delete(value) : null);
    }

    public isWinner(): boolean {
        if (this.isWinnerCache) {
            return this.isWinnerCache;
        }
        for (const set of [...this.rowSets, ...this.columnSets]) {
            if (!set.size) {
                this.isWinnerCache = true;
                return true;
            }
        }
        return false;
    }

    public wasWinner(): boolean {
        return this.isWinnerCache;
    }

    public getUnmarkedSum(): number {
        return this.rowSets.reduce((sum, set) => {
            sum += [...set].reduce((partSum, value) => partSum += value, 0); 
            return sum;
        }, 0);
    }
}