import { Snowflake } from 'discord.js';
import {
    APIApplicationCommand,
    RESTPostAPIApplicationCommandsJSONBody
} from 'discord-api-types/v10';

export interface IApplicationCommandRepository {
    readonly delete: (commandId?: Snowflake) => Promise<void>;
    readonly get: (commandId?: Snowflake) => Promise<APIApplicationCommand[]>;
    readonly register: (...json: RESTPostAPIApplicationCommandsJSONBody[]) => Promise<void>;
}
