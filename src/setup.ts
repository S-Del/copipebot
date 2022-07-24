import { IApplicationCommandRepository } from './domain/model/api/discord/';
import { ISlashCommand } from './presentation/discord/slash-command/';
import { container, Symbols } from './config/';

(async (): Promise<void> => {
    const repository = container.get<IApplicationCommandRepository>(
        Symbols.Infrastructure.ApplicationCommandRepository
    );

    try {
        console.log('===== スラッシュコマンドの登録を開始 =====');
        const jsonList = container.getAll<ISlashCommand>(Symbols.Discord.SlashCommands)
                                  .map(command => command.toJSON());
        jsonList.forEach(json => console.log(`- ${json.name}`));
        await repository.register(...jsonList);
        console.log('===== 登録完了 =====')
    } catch (err) {
        console.error(err);
    }
})();
