import { injectable } from 'inversify';
import { Snowflake } from 'discord.js';
import { AudioPlayer } from '@discordjs/voice';

/**
 * 現在ボイスチャンネルに接続しているギルドと AudioPlayer のマップ
 * Key: GuildID, Value: AudioPlayer
 */
@injectable()
export class GuildAudioPlayerMap {
    constructor(private readonly map = new Map<Snowflake, AudioPlayer>()) {}

    readonly add = (
        guildId: Snowflake, player: AudioPlayer
    ): Map<Snowflake, AudioPlayer> => this.map.set(guildId, player);

    readonly del = (guildId: Snowflake): boolean => this.map.delete(guildId);

    readonly get = (guildId: Snowflake): AudioPlayer | undefined => this.map.get(guildId);

    readonly has = (guildId: Snowflake): boolean => this.map.has(guildId);
}
