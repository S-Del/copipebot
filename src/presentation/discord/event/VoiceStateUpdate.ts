import { inject, injectable } from 'inversify';
import { Awaitable, ClientEvents, VoiceState } from 'discord.js';
import { Symbols } from '../../../config/';
import { LeaveChannelUseCase } from '../../../usecase/voice/';
import { ConnectingChannelMap } from '../../../usecase/voice/map/';
import { IClientEvent } from './';

@injectable()
export class VoiceStateUpdate implements IClientEvent {
    static readonly NAME: keyof ClientEvents = 'voiceStateUpdate';
    static readonly IS_ONCE = false;

    constructor(
        @inject(Symbols.UseCase.Map.ConnectingChannelMap)
        private readonly connectingChannelMap: ConnectingChannelMap,
        @inject(Symbols.UseCase.LeaveChannel)
        private readonly leaveChannelUseCase: LeaveChannelUseCase
    ) {}

    readonly execute = (oldState: VoiceState, _: VoiceState): Awaitable<void> => {
        const channelId = this.connectingChannelMap.get(oldState.guild.id);
        if (!channelId) return;
        if (oldState?.channel?.id !== channelId) return;
        if (oldState.channel.members.size >= 2) return;

        this.leaveChannelUseCase.handle({ guildId: oldState.guild.id });
    }

    readonly isOnce = (): boolean => VoiceStateUpdate.IS_ONCE;

    readonly name = (): keyof ClientEvents => VoiceStateUpdate.NAME;
}
