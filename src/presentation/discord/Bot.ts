import { inject, injectable, multiInject } from 'inversify';
import { Client } from 'discord.js';
import { Symbols } from '../../config';
import { IClientEvent } from './event/';

@injectable()
export class Bot {
    constructor(
        @inject(Symbols.Discord.Client) private readonly client: Client,
        @inject(Symbols.Discord.Token) private readonly token: string,
        @multiInject(Symbols.Discord.ClientEvents) events: IClientEvent[]
    ) {
        this.addEvent(...events);
    }

    readonly addEvent = (...events: IClientEvent[]): void => {
        events.forEach(event => {
            if (event.isOnce()) {
                this.client.once(event.name(), event.execute);
                return;
            }
            this.client.on(event.name(), event.execute);
        });
    }

    readonly login = async (): Promise<string> => {
        return await this.client.login(this.token);
    }
}
