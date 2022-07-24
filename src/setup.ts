import { ISlashCommand } from './presentation/discord/slash-command/';
import { ApplicationCommandRepository } from './infrastructure/api/discord';
import { container, Symbols } from './config/';

(async (): Promise<void> => {
    const repository = container.get<ApplicationCommandRepository>(
        Symbols.Infrastructure.ApplicationCommandRepository
    );
    const jsonList = container.getAll<ISlashCommand>(Symbols.Discord.SlashCommands)
                              .map(command => command.toJSON());

    try {
        console.log('===== スラッシュコマンドの登録を開始 =====');
        jsonList.forEach(json => console.log(`- ${json.name}`));
        await repository.register(...jsonList);
        console.log('===== 登録完了 =====')
    } catch (err) {
        console.error(err);
    }
})();
