import { Client, Message } from 'discord.js';
import * as commands from '.';

const PREFIX_LIST = ['cb', 'copipebot'] as const;
const MIN_PREFIX_LEN = PREFIX_LIST.map((prefix) => prefix.length)
                                  .reduce((acc, cur) => Math.min(acc, cur));
const MAX_PREFIX_LEN = PREFIX_LIST.map((prefix) => prefix.length)
                                  .reduce((acc, cur) => Math.max(acc, cur));

const COMMAND_LIST = ['emoji', 'dice', 'survey', 'help'] as const;
const MIN_COMMAND_NAME_LEN =
    COMMAND_LIST.map((command) => command.length)
                .reduce((acc, cur) => Math.min(acc, cur));
const MAX_COMMAND_NAME_LEN =
    COMMAND_LIST.map((command) => command.length)
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
  return true;
};

export const defineCommand = (client: Client): void => {
  client.on('message', (message: Message) => {
    if (message.author.bot) return;
    const wordList = message.content.split(/\s/);
    if (wordList.length < 2) return;
    if (!isValidPrefix(wordList[0])) return;

    const command = wordList[1];
    if (!isValidCommand(command)) return;

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

    void message.reply('コマンドが分かりませんでした');
  });
};
