import { inject, injectable } from 'inversify';
import { ClientEvents, Message } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { Symbols } from '../../../config/';
import { PlayVoiceUseCase } from '../../../usecase/voice/';
import { IClientEvent } from './';

@injectable()
export class MessageCreate implements IClientEvent {
    static readonly NAME: keyof ClientEvents = 'messageCreate';
    static readonly IS_ONCE = false;

    constructor(
        @inject(Symbols.UseCase.PlayVoice)
        private readonly playVoiceUseCase: PlayVoiceUseCase
    ) {}

    static readonly isValid = (message: Message): boolean => {
        return message.author.bot === false
               && Boolean(message.content);
    }

    readonly execute = async (message: Message): Promise<void> => {
        if (!MessageCreate.isValid(message)) return;
        if (!message.guild) return;
        if (!getVoiceConnection(message.guild.id)) return;

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
