import { NumberOfSurface, RollAmount, RollResult } from '.';

/**
 * ダイスロールの結果をまとめた文字列を取得するクラス
 */
export class RollResultMessage {
    constructor(
        private readonly amount: RollAmount,
        private readonly surface: NumberOfSurface,
        private readonly results: RollResult
    ) {}

    readonly toString = (): string => {
        const lines = [
            `**${this.surface}**のダイスを **${this.amount}** 振りました `,
            `(\`${this.amount.valueOf()}D${this.surface.valueOf()}\`)\n`,
            '```yaml\n',
            `${this.results}`,
            '```',
        ];
        if (!this.results.isOne()) {
            lines.push(`**合計**: \`${this.results.total()}\``);
        }

        return lines.join('');
    }
}
