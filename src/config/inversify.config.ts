import 'reflect-metadata';
import { Container } from 'inversify';
import { Client, GatewayIntentBits, Snowflake } from 'discord.js';
import { REST } from '@discordjs/rest';
import { IApplicationCommandRepository } from '../domain/model/api/discord/';
import { IVoiceTextApiClient } from '../domain/model/api/voicetext/';
import {
    IClientEvent, InteractionCreate, MessageCreate, Ready, VoiceStateUpdate
} from '../presentation/discord/event/';
import {
    DiceCommand, EmojiCommand, HelpCommand, ISlashCommand, JoinCommand, LeaveCommand
} from '../presentation/discord/slash-command/';
import { Bot } from '../presentation/discord/';
import { RollDiceUseCase } from '../usecase/dice/';
import { JoinChannelUseCase, LeaveChannelUseCase, PlayVoiceUseCase } from '../usecase/voice/';
import { ApplicationCommandRepository } from '../infrastructure/api/discord/';
import { VoiceTextApiClient } from '../infrastructure/api/voicetext/';
import { ConnectingChannelMap, GuildAudioPlayerMap } from '../usecase/voice/map/';
import { GetAllCommandNameUseCase } from '../usecase/help/';
import { Symbols } from './';
import { ConvertToEmojiUseCase } from '../usecase/emoji';

export const container = ((): Container => {
    const env = process.env.NODE_ENV;
    const discordToken = env === 'production' ? process.env.COPIPE_BOT_TOKEN
                                              : process.env.TEST_BOT_TOKEN;
    if (!discordToken) throw new Error('環境変数にボットのトークンが未定義でした');
    const discordAppId = env === 'production' ? process.env.COPIPE_BOT_APP_ID
                                              : process.env.TEST_BOT_APP_ID;
    if (!discordAppId) throw new Error('環境変数にボットの ID が未定義でした');
    const voicetextKey = process.env.VOICETEXT_API_KEY;
    if (!voicetextKey) throw new Error('環境変数に VoiceText のトークンが未定義でした');

    const container = new Container();

    container.bind<string>(Symbols.Discord.Token)
             .toConstantValue(discordToken);
    container.bind<Snowflake>(Symbols.Discord.ApplicationId)
             .toConstantValue(discordAppId);
    container.bind<string>(Symbols.VoiceText.ApiKey)
             .toConstantValue(voicetextKey);

    container.bind<Client>(Symbols.Discord.Client).toConstantValue(
        new Client({
            intents: [
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent
            ]
        })
    );

    container.bind<REST>(Symbols.Discord.Rest)
             .toConstantValue(new REST({ version: '10' }).setToken(discordToken));

    container.bind<IApplicationCommandRepository>(
        Symbols.Infrastructure.ApplicationCommandRepository
    ).to(ApplicationCommandRepository)
     .inSingletonScope();
    container.bind<IVoiceTextApiClient>(Symbols.Infrastructure.VoiceTextApiClient)
             .to(VoiceTextApiClient)
             .inSingletonScope();

    container.bind<ConnectingChannelMap>(Symbols.UseCase.Map.ConnectingChannelMap)
             .to(ConnectingChannelMap)
             .inSingletonScope()
    container.bind<GuildAudioPlayerMap>(Symbols.UseCase.Map.GuildAudioPlayerMap)
             .to(GuildAudioPlayerMap)
             .inSingletonScope();
    container.bind<ConvertToEmojiUseCase>(Symbols.UseCase.ConvertToEmoji)
             .to(ConvertToEmojiUseCase)
             .inSingletonScope();
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
    container.bind<GetAllCommandNameUseCase>(Symbols.UseCase.GetAllCommandNames)
             .to(GetAllCommandNameUseCase)
             .inSingletonScope();

    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(DiceCommand)
             .inSingletonScope();
    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(EmojiCommand)
             .inSingletonScope();
    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(JoinCommand)
             .inSingletonScope();
    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(LeaveCommand)
             .inSingletonScope();
    container.bind<ISlashCommand>(Symbols.Discord.SlashCommands)
             .to(HelpCommand)
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

    container.bind<Bot>(Symbols.Discord.Bot)
             .to(Bot)
             .inSingletonScope();

    return container;
})();
