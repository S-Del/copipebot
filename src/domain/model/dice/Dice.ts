import { randomInt } from 'mathjs';
import { NumberOfSurface, RollAmount, RollResult } from './';

/**
 * 指定された面数を持つダイス
 */
export class Dice {
    constructor(private readonly surface: NumberOfSurface) {}

    readonly roll = (count: RollAmount): RollResult => {
        return new RollResult(
            ...new Array<number>(count.valueOf())
            .fill(NaN)
            .map((): number => randomInt(1, this.surface.valueOf() + 1))
        );
    }
}
