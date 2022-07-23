import { injectable, multiInject } from 'inversify';
import { ClientEvents, CommandInteraction, GuildChannel } from 'discord.js';
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

    readonly execute = async (interaction: CommandInteraction): Promise<void> => {
        if (!interaction || !interaction.isChatInputCommand()) return;

        const command = this.commands.find(command => command.name() === interaction.commandName);
        if (!command) return;

        await command.execute(interaction);

        const userName = interaction.user.username;
        const userId = interaction.user.id;
        if ( !(interaction.channel instanceof GuildChannel) ) {
            console.log(`${userName}(${userId}) execute /${command.name()}`);
            return;
        }

        const guild = interaction.channel.guild.name;
        const channel = interaction.channel.name;
        console.log(`${userName}(${userId})@${guild}:${channel} execute /${command.name()}`);
    }

    readonly isOnce = (): boolean => InteractionCreate.IS_ONCE;

    readonly name = (): keyof ClientEvents => InteractionCreate.NAME;
}
