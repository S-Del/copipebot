import { inject, injectable } from 'inversify';
import { createAudioResource, getVoiceConnection } from '@discordjs/voice';
import { Readable } from 'stream';
import { Symbols } from '../../config/';
import { ReadableMessage, ReadableName } from '../../domain/model/voice/';
import { VoiceTextApiClient } from '../../infrastructure/api/voicetext/';
import { PlayVoiceCommand } from './';
import { GuildAudioPlayerMap } from './map/';

@injectable()
export class PlayVoiceUseCase {
    constructor(
        @inject(Symbols.UseCase.Map.GuildAudioPlayerMap)
        private readonly guildAudioPlayerMap: GuildAudioPlayerMap,
        @inject(Symbols.Infrastructure.VoiceTextApiClient)
        private readonly voiceTextApiClient: VoiceTextApiClient
    ) {}

    readonly handle = async (command: PlayVoiceCommand): Promise<void> => {
        if (!getVoiceConnection(command.guildId)) return;

        const authorName = new ReadableName(command.authorName);
        const message = new ReadableMessage(command.message);

        try {
            const data = await this.voiceTextApiClient.fetch({
                text: `${authorName} ${message}`,
                speaker: 'show',
                format: 'wav'
            });

            const stream = new Readable();
            stream.push(data);
            stream.push(null);

            const resource = createAudioResource(stream);
            const player = this.guildAudioPlayerMap.get(command.guildId);
            player?.play(resource);
        } catch (err) {
            throw new Error('読み上げに失敗');
        }
    }
}
