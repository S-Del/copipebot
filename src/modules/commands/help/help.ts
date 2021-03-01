import { Message } from 'discord.js';

export const help = (message: Message, commandList: readonly string[]): void => {
  void message.reply([
    'こぴぺボットでは以下のコマンドが利用できます',
    '```',
    commandList.join('\n'),
    '```',
    '詳細は以下のページをご覧ください',
    'https://gitlab.com/S-Del_discordbot/copipebot/-/blob/main/README.md',
  ].join('\n'));
};
