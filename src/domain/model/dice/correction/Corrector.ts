import { CorrectionOperator } from './CorrectionOperator';
import { CorrectionValue } from './CorrectionValue';

export class Corrector {
    constructor(
        private readonly operator: CorrectionOperator,
        private readonly value: CorrectionValue
    ) {}

    readonly correct = (total: number): number => {
        switch (this.operator.valueOf()) {
            case '+': return total + this.value.valueOf();
            case '-': return total - this.value.valueOf();
            case '*': return total * this.value.valueOf();
            case '/': return total / this.value.valueOf();
        }
    }

    readonly toString = (): string => {
        return `${this.operator}${this.value}`;
    }
}
