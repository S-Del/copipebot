import { injectable } from 'inversify';
import { Snowflake } from 'discord.js';

/**
 * 現在ボイスチャンネルに接続しているギルドとそのチャンネルの ID のマップ
 * Key: GuildID, Value: VoiceChannelID
 */
@injectable()
export class ConnectingChannelMap {
    constructor(private readonly map = new Map<Snowflake, Snowflake>()) {}

    readonly add = (
        guildId: Snowflake, channelId: Snowflake
    ): Map<Snowflake, Snowflake> => this.map.set(guildId, channelId);

    readonly del = (guildId: Snowflake): boolean => this.map.delete(guildId);

    readonly get = (guildId: Snowflake): Snowflake | undefined => this.map.get(guildId);

    readonly has = (guildId: Snowflake): boolean => this.map.has(guildId);
}
