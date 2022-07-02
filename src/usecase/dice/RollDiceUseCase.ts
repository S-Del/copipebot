import { injectable } from 'inversify';
import { Dice, NumberOfSurface, RollAmount } from '../../domain/model/dice/';
import { RollDiceCommand } from './';

@injectable()
export class RollDiceUseCase {
    readonly handle = (command: RollDiceCommand): string => {
        const surface = new NumberOfSurface(command.surface);
        const amount = new RollAmount(command.amount);
        const dice = new Dice(surface);
        const results = dice.roll(amount);
        if (results.isOne()) {
            return `**${surface}**ダイスの結果: \`${results.total()}\``;
        }

        return [
            `**${surface}**のダイスを **${amount}** 振った結果`,
            '```',
            `${results}`,
            '```',
            `**合計**: \`${results.total()}\``,
            `**最小**: \`${results.min()}\``,
            `**最大**: \`${results.max()}\``,
            `**中央**: \`${results.median()}\``,
            `**最頻**: \`${results.mode()}\``,
            `**平均**: \`${results.average()}\``,
            `**標準偏差**: \`±${results.deviation()}\``
        ].join('\n');
    }
}
