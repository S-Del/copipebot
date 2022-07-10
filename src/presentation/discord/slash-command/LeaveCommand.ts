import { inject, injectable } from 'inversify';
import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { CommandInteraction, CacheType, Awaitable, GuildMember, Snowflake } from 'discord.js';
import { container, Symbols } from '../../../config/';
import { LeaveChannelUseCase } from '../../../usecase/voice/';
import { ISlashCommand } from './';

@injectable()
export class LeaveCommand implements ISlashCommand {
    static readonly NAME = 'leave';
    static readonly DESCRIPTION = '接続中の音声チャンネルから切断する';

    constructor(
        @inject(Symbols.UseCase.LeaveChannel)
        private readonly leaveChannelUseCase: LeaveChannelUseCase
    ) {}

    readonly execute = (interaction: CommandInteraction<CacheType>): Awaitable<void> => {
        if (!interaction.guild) return;
        if ( !(interaction.member instanceof GuildMember) ) return;

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                content: [
                    'あなたはボイスチャンネルに接続していません',
                    'ボットが接続中のボイスチャンネルに接続してからこのコマンドを利用してください'
                ].join('\n'),
                ephemeral: true
            });
        }
        const clientId = container.get<Snowflake>(Symbols.Discord.ApplicationId);
        if (!voiceChannel.members.has(clientId)) {
            return interaction.reply({
                content: [
                    'ボットがあなたと同じボイスチャンネルに接続していません',
                    'ボットが接続中のボイスチャンネルに接続してからこのコマンドを利用してください'
                ].join('\n'),
                ephemeral: true
            });
        }

        this.leaveChannelUseCase.handle({ guildId: interaction.guild.id });

        const label = `${voiceChannel.name} (${voiceChannel.id})`;
        interaction.reply({ content: `${label} から切断` });
        console.log(`Voice Channel Leaved: ${label}`);
    }

    readonly name = (): string => LeaveCommand.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder()
               .setName(LeaveCommand.NAME)
               .setDescription(LeaveCommand.DESCRIPTION)
               .toJSON();
    }
}
