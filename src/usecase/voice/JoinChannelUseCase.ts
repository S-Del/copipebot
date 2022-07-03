import { inject, injectable } from 'inversify';
import { createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import { Symbols } from '../../config/';
import { JoinChannelCommand } from './';
import { ConnectingChannelMap, GuildAudioPlayerMap } from './map/';

@injectable()
export class JoinChannelUseCase {
    constructor(
        @inject(Symbols.UseCase.Map.GuildAudioPlayerMap)
        private readonly guildAudioPlayerMap: GuildAudioPlayerMap,
        @inject(Symbols.UseCase.Map.ConnectingChannelMap)
        private readonly connectingChannelMap: ConnectingChannelMap
    ) {}

    readonly handle = (command: JoinChannelCommand): void => {
        this.connectingChannelMap.add(command.guildId, command.channelId);
        const connection = joinVoiceChannel(command);

        if (this.guildAudioPlayerMap.has(command.guildId)) return;
        const player = createAudioPlayer();
        this.guildAudioPlayerMap.add(command.guildId, player);

        connection.subscribe(player);
    }
}
