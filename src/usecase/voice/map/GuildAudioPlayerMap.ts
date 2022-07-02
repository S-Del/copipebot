import { injectable } from 'inversify';
import { Snowflake } from 'discord.js';
import { AudioPlayer } from '@discordjs/voice';

@injectable()
export class GuildAudioPlayerMap {
    private readonly map: Map<Snowflake, AudioPlayer>;

    constructor() {
        this.map = new Map();
    }

    readonly add = (guildId: Snowflake, player: AudioPlayer): void => {
        this.map.set(guildId, player)
    };

    readonly del = (guildId: Snowflake): void => {
        this.map.delete(guildId);
    }

    readonly get = (guildId: Snowflake): AudioPlayer | undefined => {
        return this.map.get(guildId);
    }

    readonly has = (guildId: Snowflake): boolean => this.map.has(guildId);
}
