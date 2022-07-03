import { getVoiceConnection } from '@discordjs/voice';
import { inject, injectable } from 'inversify';
import { Symbols } from '../../config';
import { LeaveChannelCommand } from './';
import { ConnectingChannelMap, GuildAudioPlayerMap } from './map/';

@injectable()
export class LeaveChannelUseCase {
    constructor(
        @inject(Symbols.UseCase.Map.GuildAudioPlayerMap)
        private readonly guildAudioPlayerMap: GuildAudioPlayerMap,
        @inject(Symbols.UseCase.Map.ConnectingChannelMap)
        private readonly connectingChannelMap: ConnectingChannelMap
    ) {}

    readonly handle = (command: LeaveChannelCommand): void => {
        const conn = getVoiceConnection(command.guildId);
        conn?.disconnect();
        this.guildAudioPlayerMap.del(command.guildId);
        this.connectingChannelMap.del(command.guildId);
    }
}
