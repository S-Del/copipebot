import { randomInt } from 'mathjs';
import { NumberOfSurface, RollAmount, RollResults } from './';

/**
 * 指定された面数を持つダイス
 */
export class Dice {
    constructor(private readonly surface: NumberOfSurface) {}

    readonly roll = (count: RollAmount): RollResults => {
        return new RollResults(
            ...new Array<number>(count.valueOf())
            .fill(NaN)
            .map((): number => randomInt(1, this.surface.valueOf() + 1))
        );
    }
}
