import { IApplicationCommandRepository } from './domain/model/api/discord/';
import { ISlashCommand } from './presentation/discord/slash-command/';
import { container, Symbols } from './config/';

(async (): Promise<void> => {
    const repository = container.get<IApplicationCommandRepository>(
        Symbols.Infrastructure.ApplicationCommandRepository
    );

    try {
        console.log('===== 登録済みのスラッシュコマンドを取得 =====');
        const commands = await repository.get();
        console.log(`登録済みコマンド数: ${commands.length}`)
        console.log('===== 取得完了 =====');

        if (commands.length > 0) {
            console.log('===== 登録済みのスラッシュコマンドの削除を開始 =====')
            commands.map(command => console.log(`- ${command.name}`));
            await repository.delete();
            console.log('===== 削除完了 =====');
        }

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
