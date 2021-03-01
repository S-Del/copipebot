import { Client, Message } from 'discord.js';
import * as commands from '.';
import { shouldReadOut } from './speak/speak';

const PREFIX_LIST = ['cb', 'copipebot'] as const;
const MIN_PREFIX_LEN = PREFIX_LIST.map(prefix => prefix.length)
                                  .reduce((acc, cur) => Math.min(acc, cur));
const MAX_PREFIX_LEN = PREFIX_LIST.map(prefix => prefix.length)
                                  .reduce((acc, cur) => Math.max(acc, cur));

const COMMAND_LIST = [
  'emoji', 'dice', 'survey','join', 'leave', 'help'
] as const;
const MIN_COMMAND_NAME_LEN =
    COMMAND_LIST.map(command => command.length)
                .reduce((acc, cur) => Math.min(acc, cur));
const MAX_COMMAND_NAME_LEN =
    COMMAND_LIST.map(command => command.length)
                .reduce((acc, cur) => Math.max(acc, cur));

const isValidPrefix = (prefix: string): boolean => {
  if (prefix.length < MIN_PREFIX_LEN) return false;
  if (prefix.length > MAX_PREFIX_LEN) return false;
  if (!/^(cb|copipebot)$/.test(prefix)) return false;
  return true;
};

const isValidCommand = (command: string): boolean => {
  if (command.length < MIN_COMMAND_NAME_LEN) return false;
  if (command.length > MAX_COMMAND_NAME_LEN) return false;
  if (!COMMAND_LIST.some(item => item == command)) return false;
  return true;
};

const isCommand = (wordList: string[]): boolean => {
  return wordList.length >= 2
         && isValidPrefix(wordList[0])
         && isValidCommand(wordList[1]);
};

export const defineCommand = (client: Client): void => {
  // eslint-disable-next-line complexity
  client.on('message', (message: Message) => {
    if (message.author.bot) return;

    const wordList = message.content.split(/\s/);
    if (isValidPrefix(wordList[0]) && !isValidCommand(wordList[1])) {
      void message.reply('コマンドが分かりませんでした');
      return;
    }

    if (isCommand(wordList)) {
      const command = wordList[1];
      if (/^emoji$/.test(command)) {
        commands.emoji(message, wordList.slice(2).join(' '));
        return;
      }

      if (/^dice$/.test(command)) {
        commands.dice(message, wordList[2]);
        return;
      }

      if (/^survey$/.test(command)) {
        commands.survey(message, wordList.slice(2));
        return;
      }

      if (/^help$/.test(command)) {
        commands.help(message, COMMAND_LIST);
        return;
      }

      if (/^join$/.test(command)) {
        commands.speak(client, message);
        return;
      }

      if (/^leave$/.test(command)) {
        commands.leave(client, message);
        return;
      }
    }

    if (shouldReadOut(client, message)) {
      commands.voicetext(client, message);
      return;
    }
  });
};
