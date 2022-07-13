import { inject, injectable } from 'inversify';
import { Snowflake } from 'discord.js';
import { REST } from '@discordjs/rest';
import {
    APIApplicationCommand,
    RESTPostAPIApplicationCommandsJSONBody,
    Routes
} from 'discord-api-types/v10';
import { IApplicationCommandRepository } from '../../../domain/model/api/discord/';
import { Symbols } from '../../../config/';

@injectable()
export class ApplicationCommandRepository implements IApplicationCommandRepository {
    constructor(
        @inject(Symbols.Discord.ApplicationId) private readonly applicationId: Snowflake,
        @inject(Symbols.Discord.Rest) private readonly rest: REST
    ) {}

    readonly delete = async (commandId?: string): Promise<void> => {
        if (!commandId) return this.deleteAll();

        const route = Routes.applicationCommand(this.applicationId, commandId);
        this.rest.delete(route)
    }

    readonly deleteAll = async (): Promise<void> => {
        const route = Routes.applicationCommands(this.applicationId);
        this.rest.delete(route);
    }

    readonly get = async (commandId?: string): Promise<APIApplicationCommand[]> => {
        if (!commandId) return this.getAll();

        const route = Routes.applicationCommand(this.applicationId, commandId);
        const command = await this.rest.get(route) as APIApplicationCommand;
        return [command];
    }

    readonly getAll = async (): Promise<APIApplicationCommand[]> => {
        const route = Routes.applicationCommands(this.applicationId);
        return this.rest.get(route) as Promise<APIApplicationCommand[]>;
    }

    readonly register = async (
        ...json: RESTPostAPIApplicationCommandsJSONBody[]
    ): Promise<void> => {
        const route = Routes.applicationCommands(this.applicationId);
        this.rest.put(route, { body: json });
    }
}
