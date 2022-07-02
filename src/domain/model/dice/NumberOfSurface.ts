import { IValueObject } from '../';

export class NumberOfSurface implements IValueObject<number> {
    static readonly MIN = 2;
    static readonly MAX = 100;
    static readonly UNIT = '面';

    private readonly value: number;

    constructor(value: number) {
        const truncValue = Math.trunc(value);
        if (!NumberOfSurface.isValid(truncValue)) {
            throw new Error(`Invalid value: ${value}`);
        }

        this.value = truncValue;
    }

    static readonly isValid = (value: number): boolean => {
        return value >= this.MIN
               && value <= this.MAX;
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof NumberOfSurface
               && other.value === this.value;
    }

    readonly toString = (): string => `${this.value} ${NumberOfSurface.UNIT}`;

    readonly valueOf = (): number => this.value;
}
