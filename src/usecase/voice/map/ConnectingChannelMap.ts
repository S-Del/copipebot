import { injectable } from 'inversify';
import { Snowflake } from 'discord.js';

@injectable()
export class ConnectingChannelMap {
    private readonly map: Map<Snowflake, Snowflake>;

    constructor() {
        this.map = new Map();
    }

    readonly add = (guildId: Snowflake, channelId: Snowflake): void => {
        this.map.set(guildId, channelId)
    };

    readonly del = (guildId: Snowflake): void => {
        this.map.delete(guildId);
    }

    readonly get = (guildId: Snowflake): Snowflake | undefined => {
        return this.map.get(guildId);
    }

    readonly has = (guildId: Snowflake): boolean => this.map.has(guildId);
}
