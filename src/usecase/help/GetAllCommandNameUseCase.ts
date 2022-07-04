import { injectable } from 'inversify';
import { Snowflake } from 'discord.js';
import { REST } from '@discordjs/rest';
import { RESTGetAPIApplicationCommandsResult, Routes } from 'discord-api-types/v9';
import { container, Symbols } from '../../config/';

@injectable()
export class GetAllCommandNameUseCase {
    readonly handle = async (): Promise<string[]> => {
        const id = container.get<Snowflake>(Symbols.Discord.ApplicationId);
        const token = container.get<string>(Symbols.Discord.Token);
        const route = Routes.applicationCommands(id);
        const rest = new REST({ version: '9' }).setToken(token);
        const resp = await rest.get(route) as RESTGetAPIApplicationCommandsResult;

        return resp.map(command => command.name);
    }
}
