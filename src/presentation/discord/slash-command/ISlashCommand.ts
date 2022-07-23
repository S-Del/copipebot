import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { ChatInputCommandInteraction } from 'discord.js';

export interface ISlashCommand {
    /**
     * スラッシュコマンドが実行された時に行う処理
     */
    readonly execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

    /**
     * スラッシュコマンドの名前
     */
    readonly name: () => string;

    /**
     * スラッシュコマンドの登録を行う際に Post する json 情報
     */
    readonly toJSON: () => RESTPostAPIApplicationCommandsJSONBody;
}
