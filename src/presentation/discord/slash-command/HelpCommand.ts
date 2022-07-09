import { inject, injectable } from 'inversify';
import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { CommandInteraction, CacheType } from 'discord.js';
import { Symbols } from '../../../config/';
import { GetAllCommandNameUseCase } from '../../../usecase/help/';
import { ISlashCommand } from './';

@injectable()
export class HelpCommand implements ISlashCommand {
    static readonly NAME = 'help';
    static readonly DESCRIPTION = 'このボットのコマンドの一覧を表示する';

    static readonly README_URL = [
        'https://gitlab.com/S-Del_discordbot/copipebot/',
        '-/blob/main/README.md'
    ].join('');

    constructor(
        @inject(Symbols.UseCase.GetAllCommandNames)
        private readonly getAllCommandNamesUseCase: GetAllCommandNameUseCase
    ) {}

    readonly execute = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
        const names = await this.getAllCommandNamesUseCase.handle();
        interaction.reply({
            content: [
                'こぴぺぼっとでは以下のコマンドが利用できます',
                names.map(name => `- **${name}**`).join('\n'),
                `詳しくは ${HelpCommand.README_URL} をご覧ください`
            ].join('\n'),
            ephemeral: true
        });
    }

    readonly name = (): string => HelpCommand.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder().setName(HelpCommand.NAME)
                                        .setDescription(HelpCommand.DESCRIPTION)
                                        .toJSON();
    }
}
