import { inject, injectable } from 'inversify';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, Awaitable } from 'discord.js';
import { Symbols } from '../../../config/';
import { ConvertToEmojiUseCase } from '../../../usecase/emoji/';
import { ISlashCommand } from './';
import { EmojiMessage } from '../../../domain/model/emoji';

@injectable()
export class EmojiCommand implements ISlashCommand {
    static readonly NAME = 'emoji';
    static readonly DESCRIPTION = '文字列を絵文字に変換する';
    static readonly OPTION_LABEL = 'message';
    static readonly OPTION_DESCRIPTION = [
        '絵文字に変換する文字列を入力',
        `(${EmojiMessage.VALID_CHARS.toString()})`
    ].join(' ');

    constructor(
        @inject(Symbols.UseCase.ConvertToEmoji)
        private readonly convertToEmojiUseCase: ConvertToEmojiUseCase
    ) {}

    readonly execute = (interaction: CommandInteraction<CacheType>): Awaitable<void> => {
        try {
            const response = this.convertToEmojiUseCase.handle({
                target: interaction.options.getString(EmojiCommand.OPTION_LABEL, true)
            });
            interaction.reply(response.message);
        } catch (err) {
            interaction.reply({
                content: [
                    '絵文字コマンドの実行に失敗しました',
                    '変換できる文字は',
                    '- A から Z までのアルファベット',
                    '- 0 から 9 までの数字',
                    '- 記号 (!, ?, #, *) と空白文字',
                    'です'
                ].join('\n'),
                ephemeral: true
            });
        }
    }

    readonly name = (): string => EmojiCommand.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder()
               .setName(EmojiCommand.NAME)
               .setDescription(EmojiCommand.DESCRIPTION)
               .addStringOption(option => {
                   return option.setName(EmojiCommand.OPTION_LABEL)
                                .setDescription(EmojiCommand.OPTION_DESCRIPTION)
                                .setRequired(true)
               })
               .toJSON();
    }
}
