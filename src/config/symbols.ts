const Discord = {
    ApplicationId: Symbol.for('DiscordApplicationId'),
    Token: Symbol.for('DiscordToken'),
    Client: Symbol.for('DiscordClient'),
    Bot: Symbol.for('DiscordBot'),
    ClientEvents: Symbol.for('DiscordClientEvents'),
    SlashCommands: Symbol.for('DiscordSlashCommands'),
    Rest: Symbol.for('DiscordRest')
} as const;

const Infrastructure = {
    ApplicationCommandRepository: Symbol.for('ApplicationCommandRepository'),
    VoiceTextApiClient: Symbol.for('VoiceTextApiClient')
} as const;

const UseCase = {
    Map: {
        GuildAudioPlayerMap: Symbol.for('GuildAudioPlayerMap'),
        ConnectingChannelMap: Symbol.for('ConnectingChannelMap')
    },
    ConvertToEmoji: Symbol.for('ComvertToEmojiUseCase'),
    RollDice: Symbol.for('RollDiceUseCase'),
    JoinChannel: Symbol.for('JoinChannelUseCase'),
    LeaveChannel: Symbol.for('LeaveChannelUseCase'),
    PlayVoice: Symbol.for('PlayVoiceUseCase'),
    GetAllCommandNames: Symbol.for('GetAllCommandNamesUseCase')
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
