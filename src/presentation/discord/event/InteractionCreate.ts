import { injectable, multiInject } from 'inversify';
import { ClientEvents, GuildChannel, Interaction } from 'discord.js';
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

        const user = interaction.user.username;
        if ( !(interaction.channel instanceof GuildChannel) ) {
            console.log(`${user} execute /${command.name()}`);
            return;
        }

        const guild = interaction.channel.guild.name;
        const channel = interaction.channel.name;
        console.log(`${user}@${guild}:${channel} execute /${command.name()}`);
    }

    readonly isOnce = (): boolean => InteractionCreate.IS_ONCE;

    readonly name = (): keyof ClientEvents => InteractionCreate.NAME;
}
