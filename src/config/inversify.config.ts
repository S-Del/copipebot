import 'reflect-metadata';
import { Container } from 'inversify';
import { Client, Intents, Snowflake } from 'discord.js';
import {
    IClientEvent, InteractionCreate, MessageCreate, Ready, VoiceStateUpdate
} from '../presentation/discord/event/';
import {
    DiceCommand, ISlashCommand, JoinCommand, LeaveCommand
} from '../presentation/discord/slash-command/';
import { Bot } from '../presentation/discord/';
import { RollDiceUseCase } from '../usecase/dice/';
import {
    JoinChannelUseCase, LeaveChannelUseCase, PlayVoiceUseCase
} from '../usecase/voice/';
import { IVoiceTextApiClient } from '../domain/model/api/voicetext/';
import { VoiceTextApiClient } from '../infrastructure/api/voicetext/';
import {
    ConnectingChannelMap, GuildAudioPlayerMap
} from '../usecase/voice/map/';
import { Symbols } from './';

export const container = ((): Container => {
    const container = new Container();

    container.bind<string | undefined>(Symbols.Discord.Token)
//           .toConstantValue(process.env.TEST_BOT_TOKEN);
             .toConstantValue(process.env.COPIPE_BOT_TOKEN);
    container.bind<Snowflake | undefined>(Symbols.Discord.ApplicationId)
//           .toConstantValue(process.env.TEST_BOT_APPLICATION_ID);
             .toConstantValue(process.env.COPIPE_BOT_APPLICATION_ID);
    container.bind<string | undefined>(Symbols.VoiceText.ApiKey)
             .toConstantValue(process.env.VOICETEXT_API_KEY);

    container.bind<Client>(Symbols.Discord.Client).toConstantValue(
        new Client({
            intents:[
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        })
    );

    container.bind<IVoiceTextApiClient>(
        Symbols.Infrastructure.VoiceTextApiClient
    ).to(VoiceTextApiClient)
     .inSingletonScope();

    container.bind<GuildAudioPlayerMap>(Symbols.Discord.GuildAudioPlayerMap)
             .to(GuildAudioPlayerMap)
             .inSingletonScope();
    container.bind<ConnectingChannelMap>(Symbols.Discord.ConnectingChannelMap)
             .to(ConnectingChannelMap)
             .inSingletonScope()

    container.bind<RollDiceUseCase>(Symbols.UseCase.RollDice)
             .to(RollDiceUseCase)
             .inSingletonScope();
    container.bind<JoinChannelUseCase>(Symbols.UseCase.JoinChannel)
             .to(JoinChannelUseCase)
             .inSingletonScope();
    container.bind<LeaveChannelUseCase>(Symbols.UseCase.LeaveChannel)
             .to(LeaveChannelUseCase)
             .inSingletonScope();
    container.bind<PlayVoiceUseCase>(Symbols.UseCase.PlayVoice)
             .to(PlayVoiceUseCase)
             .inSingletonScope();

    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(DiceCommand)
             .inSingletonScope();
    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(JoinCommand)
             .inSingletonScope();
    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(LeaveCommand)
             .inSingletonScope();

    container.bind<IClientEvent>(Symbols.Discord.ClientEvents)
             .to(Ready)
             .inSingletonScope();
    container.bind<IClientEvent>(Symbols.Discord.ClientEvents)
             .to(InteractionCreate)
             .inSingletonScope();
    container.bind<IClientEvent>(Symbols.Discord.ClientEvents)
             .to(MessageCreate)
             .inSingletonScope();
    container.bind<IClientEvent>(Symbols.Discord.ClientEvents)
             .to(VoiceStateUpdate)
             .inSingletonScope();

    container.bind<Bot>(Symbols.Discord.Bot).to(Bot).inSingletonScope();

    return container;
})();
