import { Corrector } from './correction/';
import { NumberOfSurface, RollAmount, RollResults } from './';

/**
 * ダイスロールの結果をまとめた文字列を取得するクラス
 */
export class RollResultMessage {
    constructor(
        private readonly amount: RollAmount,
        private readonly surface: NumberOfSurface,
        private readonly results: RollResults,
        private readonly corrector?: Corrector
    ) {}

    readonly toString = (): string => {
        const lines = [
            `**${this.surface}**のダイスを **${this.amount}** 振りました\n`,
            '```\n',
            `${this.results}\n`,
            '```'
        ];

        if (!this.results.isOne()) {
            lines.push(`**合計**: \`${this.results.total()}\`\n`);
        }

        if (this.corrector) {
            lines.push(
                `**補正値**: \`${this.corrector}\`\n`,
                '**結果** ',
                `\`(${this.amount.valueOf()}D${this.surface.valueOf()}${this.corrector || ''})\`: `,
                `\`${this.corrector.correct(this.results.total())}\``
            );
        }

        return lines.join('');
    }
}
