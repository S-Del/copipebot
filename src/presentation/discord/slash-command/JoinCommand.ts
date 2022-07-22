import { inject, injectable } from 'inversify';
import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { GuildMember, ChatInputCommandInteraction } from 'discord.js';
import { ConnectingChannelMap } from '../../../usecase/voice/map/';
import { JoinChannelUseCase } from '../../../usecase/voice/';
import { Symbols } from '../../../config/';
import { ISlashCommand } from './';

@injectable()
export class JoinCommand implements ISlashCommand {
    static readonly NAME = 'join';
    static readonly DESCRIPTION = '音声チャンネルに接続してチャットを読み上げる';

    constructor(
        @inject(Symbols.UseCase.Map.ConnectingChannelMap)
        private readonly connectingChannelMap: ConnectingChannelMap,
        @inject(Symbols.UseCase.JoinChannel)
        private readonly joinChannelUseCase: JoinChannelUseCase
    ) {}

    readonly execute = async (interaction: ChatInputCommandInteraction): Promise<void> => {
        if ( !(interaction.member instanceof GuildMember) ) return;
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            interaction.reply({
                content: [
                    'あなたはボイスチャンネルに接続していません',
                    'このコマンドはボイスチャンネルに接続してから利用してください'
                ].join('\n'),
                ephemeral: true
            });
            return;
        }

        if (!interaction.guild) return;
        if (this.connectingChannelMap.has(interaction.guild.id)) {
            interaction.reply({
                content: 'ボットが既に別のチャンネルに接続中のため接続できません',
                ephemeral: true
            });
            return;
        }

        const label = `${voiceChannel.name} (${voiceChannel.id})`;
        if (!voiceChannel.joinable) {
            interaction.reply({
                content: [
                    `${label} には接続できません`,
                    'プライベートチャンネルであれば権限等を再確認してください'
                ].join('\n'),
                ephemeral: true
            });
            return;
        }

        this.joinChannelUseCase.handle({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        interaction.reply({ content: `${label} に接続` });
        console.log(`Voice Channel Joined: ${label}`);
    }

    readonly name = (): string => JoinCommand.NAME;

    readonly toJSON = (): RESTPostAPIApplicationCommandsJSONBody => {
        return new SlashCommandBuilder().setName(JoinCommand.NAME)
                                        .setDescription(JoinCommand.DESCRIPTION)
                                        .toJSON();
    }
}
