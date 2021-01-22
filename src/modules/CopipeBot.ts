import { Client, Message } from 'discord.js';
import { CommandValidator } from './CommandValidator';
import { SubCommandValidator } from './SubCommandValidator';
import { EmojiString } from './emoji_string/EmojiString';
import { Dice } from './dice/Dice';
import { Survey } from './survey/Survey';
import { SUB_COMMAND_NAME_LIST } from './common/common';

export class CopipeBot {
  private static instance:CopipeBot;
  private readonly TOKEN:string;
  private readonly client:Client;
  private readonly commandValidator:CommandValidator;
  private readonly subCommandValidator:SubCommandValidator;
  private isRunning:boolean;

  private constructor(token:string) {
    this.TOKEN = token;
    this.client = new Client();
    this.commandValidator = new CommandValidator();
    this.subCommandValidator = new SubCommandValidator();
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

      const messageList = message.content.split(/\s/);
      if (messageList.length < 2) { return; }

      if (!this.commandValidator.isValid(messageList[0])) { return; }

      const subCommand = messageList[1];
      if (!this.subCommandValidator.isValid(subCommand)) { return; };

      if (/^emoji$/.test(subCommand)) {
        const emoji = new EmojiString(messageList.slice(2).join(' '));
        const response = emoji.response();
        message.channel.send(response);
        message.delete();
        return;
      }

      if (/^dice$/.test(subCommand)) {
        const dice = new Dice(messageList[2]);
        const response = dice.response();
        message.channel.send(response);
        return;
      }

      if (/^survey$/.test(subCommand)) {
        const survey = new Survey(messageList.slice(2));
        const response = survey.response();
        message.channel.send(response).then(sent => {
          survey.react(sent);
        });
        message.delete();
        return;
      }

      if (/^help$/.test(subCommand)) {
        message.channel.send([
          'こぴぺボットでは以下のコマンドが利用できます',
          '```',
          SUB_COMMAND_NAME_LIST.join('\n'),
          '```',
          '詳細は以下のページをご覧ください',
          'https://gitlab.com/S-Del_discordbot/copipebot/-/blob/main/README.md'
        ].join('\n'));
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
