import { injectable } from 'inversify';
import { Client, ClientEvents } from 'discord.js';
import { IClientEvent } from './';

@injectable()
export class Ready implements IClientEvent {
    static readonly NAME: keyof ClientEvents = 'ready';
    static readonly IS_ONCE = true;

    readonly execute = (client: Client): void => {
        console.log(`===== ${client.user?.tag} 起動完了 =====`);
    }

    readonly isOnce = (): boolean => Ready.IS_ONCE;

    readonly name = (): keyof ClientEvents => Ready.NAME;
}
