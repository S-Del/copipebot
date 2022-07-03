const Discord = {
    ApplicationId: Symbol.for('DiscordApplicationId'),
    Token: Symbol.for('DiscordToken'),
    Client: Symbol.for('DiscordClient'),
    Bot: Symbol.for('DiscordBot'),
    ClientEvents: Symbol.for('DiscordClientEvents'),
    SlashCommands: Symbol.for('DiscordSlashCommands'),
} as const;

const Infrastructure = {
    VoiceTextApiClient: Symbol.for('VoiceTextApiClient')
} as const;

const UseCase = {
    Map: {
        GuildAudioPlayerMap: Symbol.for('GuildAudioPlayerMap'),
        ConnectingChannelMap: Symbol.for('ConnectingChannelMap')
    },
    RollDice: Symbol.for('RollDiceUseCase'),
    JoinChannel: Symbol.for('JoinChannelUseCase'),
    LeaveChannel: Symbol.for('LeaveChannelUseCase'),
    PlayVoice: Symbol.for('PlayVoiceUseCase')
} as const;

const VoiceText = {
    ApiKey: Symbol.for('VoiceTextApiKey')
} as const;

export const Symbols = {
    Discord,
    Infrastructure,
    UseCase,
    VoiceText
} as const;
