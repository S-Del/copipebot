import { Client, Message } from 'discord.js';
import { EmojiString } from './emoji_string/EmojiString';

export class CopipeBot {
  private static instance:CopipeBot;
  private readonly TOKEN:string;
  private readonly client:Client;
  private isRunning:boolean;

  private constructor(token:string) {
    this.TOKEN = token;
    this.client = new Client();
    this.isRunning = false;
    this.defineEvents();
  }

  static readonly getInstance = (token:string):CopipeBot => {
    if (!CopipeBot.instance) {
      CopipeBot.instance = new CopipeBot(token);
    }

    return CopipeBot.instance;
  };

  private readonly defineEvents = ():void => {
    this.client.on('message', (message:Message) => {
      if (message.author.bot) { return; }
      if (!message.content.match(/^(cb |copipebot )/)) { return; }

      const channel = message.channel;
      const messageList = message.content.split(' ');
      const command = messageList[1];

      if (command.match(/^emoji$/)) {
        const rawMessage = messageList.slice(2).join(' ');
        const emojiStr = new EmojiString();
        const response = emojiStr.response(rawMessage);
        channel.send(response);
        message.delete();
        return;
      }

      channel.send('コマンドが分かりませんでした');
      return;
    });
  };

  readonly run = ():void => {
    if (this.isRunning) { return; }

    this.client.login(this.TOKEN);
    this.isRunning = true;
  };
}
