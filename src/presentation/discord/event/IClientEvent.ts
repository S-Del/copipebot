import { Awaitable, ClientEvents } from 'discord.js';

export interface IClientEvent {
    readonly execute: (...args: any[]) => Awaitable<void>;
    readonly isOnce: () => boolean;
    readonly name: () => keyof ClientEvents;
}
