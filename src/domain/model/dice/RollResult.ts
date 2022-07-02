import { max, mean, median, min, mode, std, sum } from 'mathjs';

export class RollResult implements Iterable<number>{
    private readonly results: number[];

    constructor(...results: number[]) {
        this.results = results;
    }

    readonly [Symbol.iterator] = (): Iterator<number> => {
        return this.results[Symbol.iterator]();
    }

    /** 平均値 */
    readonly average = (): number => mean(...this.results);

    /** 標準偏差値 */
    readonly deviation = (): number => std(...this.results);

    /** 結果が一つの場合は true、そうでなければ false */
    readonly isOne = (): boolean => this.results.length === 1;

    /** 最大値 */
    readonly max = (): number => max(...this.results);

    /** 中央値 */
    readonly median = (): number => median(...this.results);

    /** 最小値 */
    readonly min = (): number => min(...this.results);

    /** 最頻値 */
    readonly mode = (): number[] => mode(...this.results);

    /** 合計値 */
    readonly total = (): number => sum(...this.results);

    /** 全ての結果をカンマ区切りした文字列 */
    readonly toString = (): string => this.results.join(', ');
}
