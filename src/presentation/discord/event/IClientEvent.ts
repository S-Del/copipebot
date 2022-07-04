import { Awaitable, ClientEvents } from 'discord.js';

export interface IClientEvent {
    /**
     * イベント発生時に実行される処理
     */
    readonly execute: (...args: any[]) => Awaitable<void>;

    /**
     * 一度しか実行されないイベントなら true を返す
     */
    readonly isOnce: () => boolean;

    /**
     * イベント名
     */
    readonly name: () => keyof ClientEvents;
}
