import { inject, injectable } from 'inversify';
import { ClientEvents, Message } from 'discord.js';
import { Symbols } from '../../../config/';
import { PlayVoiceUseCase } from '../../../usecase/voice/';
import { ConnectingChannelMap } from '../../../usecase/voice/map';
import { IClientEvent } from './';

@injectable()
export class MessageCreate implements IClientEvent {
    static readonly NAME: keyof ClientEvents = 'messageCreate';
    static readonly IS_ONCE = false;

    constructor(
        @inject(Symbols.UseCase.Map.ConnectingChannelMap)
        private readonly connectingChannelMap: ConnectingChannelMap,
        @inject(Symbols.UseCase.PlayVoice)
        private readonly playVoiceUseCase: PlayVoiceUseCase
    ) {}

    static readonly isValid = (message: Message): boolean => {
        return message.author.bot === false
               && Boolean(message.content);
    }

    readonly execute = async (message: Message): Promise<void> => {
        if (!message.guild) return;
        const channelId = this.connectingChannelMap.get(message.guild.id);
        if (!channelId) return;
        const channel = await message.guild.channels.fetch(channelId);
        if (!channel || !channel.isVoice()) return;
        if (!channel.members.has(message.author.id)) return;
        if (!MessageCreate.isValid(message)) return;

        try {
            await this.playVoiceUseCase.handle({
                guildId: message.guild.id,
                authorName: message.author.username,
                message: message.content,
            });
        } catch (err) {
            message.reply({ content: '読み上げられないメッセージでした' });
        }
    }

    readonly isOnce = (): boolean => MessageCreate.IS_ONCE;

    readonly name = (): keyof ClientEvents => MessageCreate.NAME;
}
