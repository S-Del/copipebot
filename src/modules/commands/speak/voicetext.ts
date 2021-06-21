import { Client, Message, VoiceConnection } from "discord.js";
import axios from 'axios';
import { Readable } from 'stream';

const VOICE_TEXT_API_KEY = process.env.VOICE_TEXT_API_KEY;
const READ_MESSAGE_LIMIT_LENGTH = 50;

const sanitizeText = (text: string): string => {
  let message = text.replace(/https?:\/\/\S+/g, 'URL省略')
                    .replace(/<a?:.*?:\d+/g, '')
                    .replace(/<@&?\d+>/g, '')
                    .replace(/<#\d+>/g, '')
                    .replace(/ʬ+/g, 'わらわら')
                    .replace(/[wWｗＷ]{2,}/g, 'わらわら')
                    .replace(/[wWｗＷ]$/g, 'わら');
  if (message.length > READ_MESSAGE_LIMIT_LENGTH) {
    message = message.slice(0, READ_MESSAGE_LIMIT_LENGTH - 4) + ' 以下略';
  }

  return message;
};

const readMessage = (
  message: Message,
  conn: VoiceConnection
): Promise<void> => {
  if (!VOICE_TEXT_API_KEY) {
    throw new Error('VoiceTextAPI キーが見つかりませんでした ');
  }

  return axios.request({
    responseType: 'arraybuffer',
    url: 'https://api.voicetext.jp/v1/tts',
    method: 'POST',
    auth: {
      username: VOICE_TEXT_API_KEY,
      password: '',
    },
    params: {
      text: sanitizeText(message.content),
      speaker: 'show'
    }
  }).then(resp => {
    const stream = new Readable();
    stream.push(resp.data)
    stream.push(null);
    conn.play(stream);
  }).catch(reason => {
    console.error(reason);
    void message.reply(
      '読み上げに失敗しました。VoiceTextAPI でエラーが発生しています。'
    );
  });
};

export const voicetext = (client: Client, message: Message): void => {
  const guildID = message.guild?.id;
  if (!guildID) return;

  const conn = client.voice?.connections.get(guildID);
  if (!conn) return;

  const channel = message.member?.voice.channel;
  if (!channel) return;

  const botChannelID = conn.channel.id;
  const memberChannelID = channel.id;
  if (botChannelID != memberChannelID) return;

  void readMessage(message, conn);
};
