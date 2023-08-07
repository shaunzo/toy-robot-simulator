export class Table {
    xSlots: number[] = [];
    ySlots: number[] = [];

    constructor(size: number) {
        for (let index = 0; index < size; index++) {
            this.xSlots.push(index);
            this.ySlots.push(index);
        }
    }

    /**
     * 
     * @param pos position values[0, 1] x and y co ordinates
     */
    public isPositionValid(pos: number[]):boolean {
        return (this.xSlots[pos[0]] !== undefined && this.xSlots[pos[1]] !== undefined);
    }
}