import { Client, Message } from 'discord.js';

export const leave = (client: Client, message: Message): void => {
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
  if (!conn) {
    void message.reply('こぴぺボットはボイスチャンネルに接続していません');
    return;
  }

  if (conn.channel.id != channel.id) {
    void message.reply(
      'こぴぺボットと同じボイスチャンネルでこのコマンドを実行してください'
    );
    return;
  }

  void conn.disconnect();
};
