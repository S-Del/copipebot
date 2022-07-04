import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { Awaitable, CommandInteraction } from 'discord.js';

export interface ISlashCommand {
    /**
     * スラッシュコマンドが実行された時に行う処理
     */
    readonly execute: (interaction: CommandInteraction) => Awaitable<void>;

    /**
     * スラッシュコマンドの名前
     */
    readonly name: () => string;

    /**
     * スラッシュコマンドの登録を行う際に Post する json 情報
     */
    readonly toJSON: () => RESTPostAPIApplicationCommandsJSONBody;
}
