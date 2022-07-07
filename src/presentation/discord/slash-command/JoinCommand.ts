import { inject, injectable } from 'inversify';
import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { CommandInteraction, CacheType, Awaitable, GuildMember } from 'discord.js';
import { JoinChannelUseCase } from '../../../usecase/voice/';
import { Symbols } from '../../../config/';
import { ISlashCommand } from './';

@injectable()
export class JoinCommand implements ISlashCommand {
    static readonly NAME = 'join';
    static readonly DESCRIPTION = '音声チャンネルに接続してチャットを読み上げる';

    constructor(
        @inject(Symbols.UseCase.JoinChannel) private readonly joinChannelUseCase: JoinChannelUseCase
    ) {}

    readonly execute = (interaction: CommandInteraction<CacheType>): Awaitable<void> => {
        if (!interaction.guild) return;
        if ( !(interaction.member instanceof GuildMember) ) return;
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: [
                    'あなたはボイスチャンネルに接続していません',
                    'このコマンドはボイスチャンネルに接続してから利用してください'
                ].join('\n'),
                ephemeral: true
            });
        }

        this.joinChannelUseCase.handle({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        return interaction.reply({ content: `${interaction.member.voice.channel.name} に接続` });
    }

    readonly name = (): string => JoinCommand.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder().setName(JoinCommand.NAME)
                                        .setDescription(JoinCommand.DESCRIPTION)
                                        .toJSON();
    }
}
