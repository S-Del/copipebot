import { injectable } from 'inversify';
import { CorrectionOperator, CorrectionValue, Corrector } from '../../domain/model/dice/correction/';
import { Dice, NumberOfSurface, RollResultMessage, RollAmount } from '../../domain/model/dice/';
import { RollDiceCommand } from './';

@injectable()
export class RollDiceUseCase {
    readonly handle = (command: RollDiceCommand): string => {
        const surface = new NumberOfSurface(command.surface);
        const amount = new RollAmount(command.amount);
        const dice = new Dice(surface);
        const corrector = (() => {
            if (!command.correctionOperator || !command.correctionValue) return;
            return new Corrector(
                new CorrectionOperator(command.correctionOperator),
                new CorrectionValue(command.correctionValue)
            );
        })();
        const results = dice.roll(amount);

        return `${new RollResultMessage(amount, surface, results, corrector)}`;
    }
}
