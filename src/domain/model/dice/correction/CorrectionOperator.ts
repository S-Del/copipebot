import { IValueObject } from '../../';

type Operators = '+' | '-' | '*' | '/';

/**
 * 補正値の演算子を保持する値オブジェクト
 */
export class CorrectionOperator implements IValueObject<string> {
    static readonly VALID_CHAR = /^[+\-*/]$/;

    private readonly value: Operators;

    constructor(value: string) {
        if (!CorrectionOperator.isValid(value)) {
            throw new Error(`Invalid value: ${value}`);
        }

        this.value = value;
    }

    static readonly isValid = (operator: string): operator is Operators => {
        return operator.length === 1
               && CorrectionOperator.VALID_CHAR.test(operator);
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof CorrectionOperator
               && other.value === this.value;
    }

    readonly toString = (): Operators => this.value;

    readonly valueOf = (): Operators => this.value;
}
