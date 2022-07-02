import { DiscordGatewayAdapterCreator } from '@discordjs/voice';

export interface JoinChannelCommand {
    readonly channelId: string,
    readonly guildId: string,
    readonly adapterCreator: DiscordGatewayAdapterCreator;
}
