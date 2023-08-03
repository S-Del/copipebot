import { inject, injectable } from 'inversify';
import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { ChatInputCommandInteraction } from 'discord.js';
import { Symbols } from '../../../config/';
import { CorrectionValue } from '../../../domain/model/dice/correction';
import { NumberOfSurface, RollAmount } from '../../../domain/model/dice/';
import { RollDiceUseCase } from '../../../usecase/dice/';
import { ISlashCommand, CommandDefinition } from './';

@injectable()
export class DiceCommand implements ISlashCommand {
    static readonly DEFINITION: CommandDefinition = {
        NAME: 'dice',
        DESCRIPTION: 'Roll the dice with the specified number of sides and the number of times',
        DESCRIPTION_JP: '指定した面数と回 (個) 数のサイコロを振る',
        OPTIONS: {
            AMOUNT: {
                NAME: 'amount',
                NAME_JP: '回数',
                DESCRIPTION: 'number of dice rolls',
                DESCRIPTION_JP: '振る回 (個) 数を入力',
                REQUIRED: true
            },
            SURFACE: {
                NAME: 'surface',
                NAME_JP: '面数',
                DESCRIPTION: 'number of surface on the dice',
                DESCRIPTION_JP: '面数を入力',
                REQUIRED: true
            },
            SECRET: {
                NAME: 'secret',
                NAME_JP: 'シークレットダイス',
                DESCRIPTION: 'True for a secret dice',
                DESCRIPTION_JP: 'シークレットダイスの場合は True を指定',
                REQUIRED: false
            },
            CORRECTION_OPERATOR: {
                NAME: 'correction_operator',
                NAME_JP: '補正値の計算方法',
                DESCRIPTION: 'operator for correct',
                DESCRIPTION_JP: '補正値の計算方法を選択',
                REQUIRED: false,
                CHOICES: [
                    { name: '+', value: '+' },
                    { name: '-', value: '-' },
                    { name: '*', value: '*' },
                    { name: '/', value: '/' }
                ]
            },
            CORRECTION_VALUE: {
                NAME: 'correction_value',
                NAME_JP: '補正値',
                DESCRIPTION: 'value for correct',
                DESCRIPTION_JP: '補正値を入力',
                REQUIRED: false
            }
        }
    } as const;

    constructor(
        @inject(Symbols.UseCase.RollDice) private readonly rollDiceUseCase: RollDiceUseCase
    ) {}

    readonly execute = async (interaction: ChatInputCommandInteraction): Promise<void> => {
        try {
            const surface = interaction.options.getInteger(
                DiceCommand.DEFINITION.OPTIONS.SURFACE.NAME, true
            );
            const amount = interaction.options.getInteger(
                DiceCommand.DEFINITION.OPTIONS.AMOUNT.NAME, true
            );
            const secret = interaction.options.getBoolean(
                DiceCommand.DEFINITION.OPTIONS.SECRET.NAME, false
            ) ?? false;
            const correctionOperator = interaction.options.getString(
                DiceCommand.DEFINITION.OPTIONS.CORRECTION_OPERATOR.NAME, false
            )?? void 0;
            const correctionValue = interaction.options.getInteger(
                DiceCommand.DEFINITION.OPTIONS.CORRECTION_VALUE.NAME, false
            )?? void 0;
            const resultMessage = this.rollDiceUseCase.handle({
                surface, amount, correctionOperator, correctionValue
            });
            interaction.reply({ content: resultMessage, ephemeral: secret });

            // シークレットダイスだった場合はチャンネルに通知を行う
            if (secret) {
                interaction.channel?.send([
                    `**${interaction.user.username}** さんはシークレットダイスを振りました`,
                    '結果は本人にのみ表示されています'
                ].join('\n'));
            }
        } catch (err) {
            interaction.reply({ content: 'ダイスコマンドの実行に失敗しました', ephemeral: true });
        }
    }

    readonly name = (): string => DiceCommand.DEFINITION.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder()
               .setName(DiceCommand.DEFINITION.NAME)
               .setDescription(DiceCommand.DEFINITION.DESCRIPTION)
               .addIntegerOption(option => {
                   return option.setName(DiceCommand.DEFINITION.OPTIONS.AMOUNT.NAME)
                                .setNameLocalization(
                                    'ja', DiceCommand.DEFINITION.OPTIONS.AMOUNT.NAME_JP || null
                                )
                                .setDescription(DiceCommand.DEFINITION.OPTIONS.AMOUNT.DESCRIPTION)
                                .setDescriptionLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION.OPTIONS.AMOUNT.DESCRIPTION_JP || null
                                )
                                .setRequired(DiceCommand.DEFINITION.OPTIONS.AMOUNT.REQUIRED)
                                .setMinValue(RollAmount.MIN)
                                .setMaxValue(RollAmount.MAX);
               })
               .addIntegerOption(option => {
                   return option.setName(DiceCommand.DEFINITION.OPTIONS.SURFACE.NAME)
                                .setNameLocalization(
                                    'ja', DiceCommand.DEFINITION.OPTIONS.SURFACE.NAME_JP || null
                                )
                                .setDescription(DiceCommand.DEFINITION.OPTIONS.SURFACE.DESCRIPTION)
                                .setDescriptionLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION.OPTIONS.SURFACE.DESCRIPTION_JP || null
                                )
                                .setRequired(DiceCommand.DEFINITION.OPTIONS.SURFACE.REQUIRED)
                                .setMinValue(NumberOfSurface.MIN)
                                .setMaxValue(NumberOfSurface.MAX);
               })
               .addBooleanOption(option => {
                   return option.setName(DiceCommand.DEFINITION.OPTIONS.SECRET.NAME)
                                .setNameLocalization(
                                    'ja', DiceCommand.DEFINITION.OPTIONS.SECRET.NAME_JP || null
                                )
                                .setDescription(DiceCommand.DEFINITION.OPTIONS.SECRET.DESCRIPTION)
                                .setDescriptionLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION.OPTIONS.SECRET.DESCRIPTION_JP || null
                                )
                                .setRequired(DiceCommand.DEFINITION.OPTIONS.SECRET.REQUIRED);
               })
               .addStringOption(option => {
                   return option.setName(DiceCommand.DEFINITION.OPTIONS.CORRECTION_OPERATOR.NAME)
                                .setNameLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION
                                               .OPTIONS
                                               .CORRECTION_OPERATOR
                                               .NAME_JP || null
                                )
                                .setDescription(
                                    DiceCommand.DEFINITION.OPTIONS.CORRECTION_OPERATOR.DESCRIPTION
                                )
                                .setDescriptionLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION
                                               .OPTIONS
                                               .CORRECTION_OPERATOR
                                               .DESCRIPTION_JP || null
                                )
                                .setRequired(
                                    DiceCommand.DEFINITION.OPTIONS.CORRECTION_OPERATOR.REQUIRED
                                )
                                .addChoices(
                                    ...DiceCommand.DEFINITION.OPTIONS.CORRECTION_OPERATOR.CHOICES
                                    || [
                                        { name: '+', value: '+' },
                                        { name: '-', value: '-' },
                                        { name: '*', value: '*' },
                                        { name: '/', value: '/' }
                                    ]
                                );
               })
               .addIntegerOption(option => {
                   return option.setName(DiceCommand.DEFINITION.OPTIONS.CORRECTION_VALUE.NAME)
                                .setNameLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION.OPTIONS.CORRECTION_VALUE.NAME_JP || null
                                )
                                .setDescription(
                                    DiceCommand.DEFINITION.OPTIONS.CORRECTION_VALUE.DESCRIPTION
                                )
                                .setDescriptionLocalization(
                                    'ja',
                                    DiceCommand.DEFINITION
                                               .OPTIONS
                                               .CORRECTION_VALUE
                                               .DESCRIPTION_JP || null
                                )
                                .setRequired(
                                    DiceCommand.DEFINITION.OPTIONS.CORRECTION_VALUE.REQUIRED
                                )
                                .setMinValue(CorrectionValue.MIN)
                                .setMaxValue(CorrectionValue.MAX);
               })
               .toJSON();
    }
}
