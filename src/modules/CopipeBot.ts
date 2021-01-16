import { Client, Message } from 'discord.js';
import { EmojiString } from './emoji_string/EmojiString';
import { Dice } from './dice/Dice';
import { Survey } from './survey/Survey';

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

  private readonly validatePrefix = (prefix:string):boolean => {
      if (prefix.length < 2) { return true; }
      if (prefix.length > 9) { return true; }
      if (!prefix.match(/^(cb|copipebot)$/)) { return true; }
      return false;
  }

  private readonly validateCommand = (command:string):boolean => {
    if (command.length < 4) { return true; }
    if (command.length > 6) { return true; }
    return false;
  }

  private readonly defineEvents = ():void => {
    this.client.on('message', (message:Message) => {
      if (message.author.bot) { return; }

      const messageList = message.content.split(/\s/);
      if (messageList.length < 2) { return; }

      if (this.validatePrefix(messageList[0])) { return; }

      const command = messageList[1];
      if (this.validateCommand(command)) { return; };

      if (command.match(/^emoji$/)) {
        const emoji = new EmojiString(messageList.slice(2).join(' '));
        const response = emoji.response();
        message.channel.send(response);
        message.delete();
        return;
      }

      if (command.match(/^dice$/)) {
        const dice = new Dice(messageList[2]);
        const response = dice.response();
        message.channel.send(response);
        return;
      }

      if (command.match(/^survey$/)) {
        const survey = new Survey(messageList.slice(2));
        const response = survey.response();
        message.channel.send(response).then(sent => {
          survey.react(sent);
        });
        message.delete();
        return;
      }

      message.channel.send('コマンドが分かりませんでした');
      return;
    });
  };

  readonly run = ():void => {
    if (this.isRunning) { return; }

    this.client.login(this.TOKEN);
    this.isRunning = true;
  };
}
