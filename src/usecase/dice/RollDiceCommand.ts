export interface RollDiceCommand {
    readonly amount: number;
    readonly surface: number;
    readonly correctionOperator?: string;
    readonly correctionValue?: number;
}
