// https://cloud.voicetext.jp/webapi/docs/api

type Speaker = 'show' | 'haruka' | 'hikari' | 'takeru' | 'santa' | 'bear';

type Format = 'wav' | 'ogg' | 'mp3';

type Emotion = 'happiness' | 'anger' | 'sadness';

type EmotionLevel = 1 | 2 | 3 | 4;

export interface VoiceTextPostParameter {
    readonly text: string;
    readonly speaker: Speaker;
    readonly format?: Format;
    readonly emotion?: Emotion;
    readonly emotion_level?: EmotionLevel;
    readonly pitch?: number; // 50 - 200, default: 100 (%)
    readonly speed?: number; // 50 - 400, default: 100 (%)
    readonly volume?: number; // 50 - 200, default: 100 (%)
}
