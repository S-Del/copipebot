import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { Awaitable, CommandInteraction } from 'discord.js';

export interface ISlashCommand {
    readonly execute: (interaction: CommandInteraction) => Awaitable<void>;
    readonly name: () => string;
    readonly toJSON: () => RESTPostAPIApplicationCommandsJSONBody;
}
