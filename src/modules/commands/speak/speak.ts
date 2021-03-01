import { Client, Message } from 'discord.js';

export const shouldReadOut = (client: Client, message: Message): boolean => {
  const guildID = message.guild?.id;
  if (!guildID) return false;

  const voiceConnection = client.voice?.connections.get(guildID);
  if (!voiceConnection) return false;

  const memberChannelID = message.member?.voice.channel?.id;
  if (!memberChannelID) return false;

  const botChannelID = voiceConnection.channel.id;
  if (memberChannelID != botChannelID) return false;

  return true;
};

export const speak = (client: Client, message: Message): void => {
  const guildID = message.guild?.id;
  if (!guildID) return;

  const channel = message.member?.voice.channel;
  if (!channel) {
    void message.reply(
      'ボイスチャンネルに接続してからこのコマンドを使用してください'
    );
    return;
  }

  const conn = client.voice?.connections.get(guildID);
  if (conn) {
    void message.reply('こぴぺボットは既にボイスチャンネルに接続中です')
    return;
  }

  void channel.join();
};
