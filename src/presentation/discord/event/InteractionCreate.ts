import { injectable, multiInject } from 'inversify';
import { ClientEvents, Interaction } from 'discord.js';
import { Symbols } from '../../../config/';
import { ISlashCommand } from '../slash-command/';
import { IClientEvent } from './';

@injectable()
export class InteractionCreate implements IClientEvent {
    static readonly NAME: keyof ClientEvents = 'interactionCreate';
    static readonly IS_ONCE = false;

    constructor(
        @multiInject(Symbols.Discord.SlashCommands) private readonly commands: ISlashCommand[]
    ) {}

    readonly execute = async (interaction: Interaction): Promise<void> => {
        if (!interaction || !interaction.isCommand()) return;

        const command = this.commands.find(command => command.name() === interaction.commandName);
        if (!command) return;

        await command.execute(interaction);
    }

    readonly isOnce = (): boolean => InteractionCreate.IS_ONCE;

    readonly name = (): keyof ClientEvents => InteractionCreate.NAME;
}
