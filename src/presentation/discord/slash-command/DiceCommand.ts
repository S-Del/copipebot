import { inject, injectable } from 'inversify';
import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { CommandInteraction, CacheType } from 'discord.js';
import { Symbols } from '../../../config/';
import { NumberOfSurface, RollAmount } from '../../../domain/model/dice/';
import { RollDiceUseCase } from '../../../usecase/dice/';
import { ISlashCommand } from './';

@injectable()
export class DiceCommand implements ISlashCommand {
    static readonly NAME = 'dice';
    static readonly DESCRIPTION = '指定した面数と回 (個) 数のサイコロを振る';

    static readonly AMOUNT_LABEL = 'amount';
    static readonly AMOUNT_DESCRIPTION = 'ダイスを振る回 (個) 数を入力';

    static readonly SURFACE_LABEL = 'surface';
    static readonly SURFACE_DESCRIPTION = 'ダイスの面数を入力';

    constructor(
        @inject(Symbols.UseCase.RollDice)
        private readonly rollDiceUseCase: RollDiceUseCase
    ) {}

    readonly execute = async (
        interaction: CommandInteraction<CacheType>
    ): Promise<void> => {
        try {
            const result = this.rollDiceUseCase.handle({
                surface: interaction.options.getInteger(
                    DiceCommand.SURFACE_LABEL, true
                ),
                amount: interaction.options.getInteger(
                    DiceCommand.AMOUNT_LABEL, true
                )
            });
            await interaction.reply(result);
        } catch (err) {
            await interaction.reply({
                content: 'ダイスコマンドの実行に失敗しました',
                ephemeral: true
            });
        }
    }

    readonly name = (): string => DiceCommand.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder()
               .setName(DiceCommand.NAME)
               .setDescription(DiceCommand.DESCRIPTION)
               .addIntegerOption((option) => {
                   return option.setName(DiceCommand.AMOUNT_LABEL)
                                .setDescription(DiceCommand.AMOUNT_DESCRIPTION)
                                .setMinValue(RollAmount.MIN)
                                .setMaxValue(RollAmount.MAX)
                                .setRequired(true)
               })
               .addIntegerOption((option) => {
                   return option.setName(DiceCommand.SURFACE_LABEL)
                                .setDescription(
                                    DiceCommand.SURFACE_DESCRIPTION
                                )
                                .setMinValue(NumberOfSurface.MIN)
                                .setMaxValue(NumberOfSurface.MAX)
                                .setRequired(true)
               })
               .toJSON();
    }
}
