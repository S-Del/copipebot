import { IValueObject } from '../';

/**
 * ダイスを振る回 (個) 数を表す値オブジェクト
 */
export class RollAmount implements IValueObject<number> {
    static readonly MIN = 1;
    static readonly MAX = 100;
    static readonly UNIT = '回 (個)';

    private readonly value: number;

    constructor(value: number) {
        const truncValue = Math.trunc(value);
        if (!RollAmount.isValid(truncValue)) {
            throw new Error(`Invalid value: ${value}`);
        }

        this.value = truncValue;
    }

    static readonly isValid = (value: number): boolean => {
        return value >= this.MIN
               && value <= this.MAX;
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof RollAmount
               && other.value === this.value;
    }

    readonly toString = (): string => `${this.value} ${RollAmount.UNIT}`;

    readonly valueOf = (): number => this.value;
}
