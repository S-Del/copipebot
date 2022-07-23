import { IValueObject } from '../../';

/**
 * ダイスの補正値を表す値オブジェクト
 */
export class CorrectionValue implements IValueObject<number> {
    static readonly MIN = 1;
    static readonly MAX = 100;

    private readonly value: number;

    constructor(value: number) {
        const truncValue = Math.trunc(value)
        if (!CorrectionValue.isValid(truncValue)) {
            throw new Error(`Invalid value: ${value}`);
        }

        this.value = truncValue;
    }

    static readonly isValid = (value: number): boolean => {
        return value >= CorrectionValue.MIN
               && value <= CorrectionValue.MAX;
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof CorrectionValue
               && other.value === this.value;
    }

    readonly toString = (): string => `${this.value}`;

    readonly valueOf = (): number => this.value;
}
