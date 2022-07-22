import { injectable } from 'inversify';
import { Dice, NumberOfSurface, RollResultMessage, RollAmount } from '../../domain/model/dice/';
import { RollDiceCommand } from './';

@injectable()
export class RollDiceUseCase {
    readonly handle = (command: RollDiceCommand): string => {
        const surface = new NumberOfSurface(command.surface);
        const amount = new RollAmount(command.amount);
        const dice = new Dice(surface);
        const results = dice.roll(amount);

        return `${new RollResultMessage(amount, surface, results)}`;
    }
}
