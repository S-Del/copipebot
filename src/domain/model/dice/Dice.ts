import { randomInt } from 'mathjs';
import { NumberOfSurface, RollAmount, RollResult } from './';

export class Dice {
    private readonly surface: NumberOfSurface;

    constructor(surface: NumberOfSurface) {
        this.surface = surface;
    }

    readonly roll = (count: RollAmount): RollResult => {
        return new RollResult(...
            new Array<number>(count.valueOf())
            .fill(NaN)
            .map((): number => randomInt(1, this.surface.valueOf() + 1))
        );
    }
}
