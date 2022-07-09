import { Snowflake } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { container, Symbols } from './config/';
import { ISlashCommand } from './presentation/discord/slash-command/';

(async (): Promise<void> => {
    const applicationId = container.get<Snowflake>(Symbols.Discord.ApplicationId);
    const token = container.get<string>(Symbols.Discord.Token);

    const route = Routes.applicationCommands(applicationId);
    const rest = new REST({ version: '9' }).setToken(token);
    const jsonList = container.getAll<ISlashCommand>(Symbols.Discord.SlashCommands)
                              .map(command => command.toJSON());

    try {
        console.log('===== スラッシュコマンドの登録を開始 =====');
        jsonList.forEach(json => console.log(`- ${json.name}`));
        await rest.put(route, { body: jsonList });
        console.log('===== 登録完了 =====')
    } catch (err) {
        console.error(err);
    }
})();
