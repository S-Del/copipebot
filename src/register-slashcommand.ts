import { Snowflake } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { container } from './config/inversify.config';
import { ISlashCommand } from './presentation/discord/slash-command/';
import { Symbols } from './config/';

(async (): Promise<void> => {
    const applicationId = container.get<Snowflake>(
        Symbols.Discord.ApplicationId
    );
    const route = Routes.applicationCommands(applicationId);

    const token = container.get<string>(Symbols.Discord.Token);
    const rest = new REST({ version: '9' }).setToken(token);
    const commands = container.getAll<ISlashCommand>(
        Symbols.Discord.SlashCommands
    ).map(command => command.toJSON());

    try {
        console.log('===== スラッシュコマンドの登録を開始 =====');
        commands.forEach((value) => console.log(`- ${value.name}`));
        await rest.put(route, { body: commands });
        console.log('===== 登録完了 =====')
    } catch (err) {
        console.error(err);
    }
})();
