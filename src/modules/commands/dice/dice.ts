import { Message } from 'discord.js';
import { ndn } from './ndn';
import { dnn } from './dnn';

const isValidDiceFormat = (format: string): string => {
  if (!format) return 'ダイスの個数や面数の指定が無かったよ';
  if (format.length < 2) return 'ダイスの個数や面数の指定が誤っていたよ';
  if (format.length > 7) return 'ダイスの個数や面数の指定が誤っていたよ';
  if (/[^0-9dD]/.test(format)) return 'ダイスにできない文字が含まれていたよ';
  return '';
}

export const dice = (message: Message, diceFormat: string): void => {
  const error = isValidDiceFormat(diceFormat);
  if (error) {
    void message.reply(error);
    return;
  }

  const format = diceFormat.split(/[dD]/).filter(Boolean);
  if (format.length === 2) {
    const amount = parseInt(format[0]);
    const diceMaxValue = parseInt(format[1]);
    const result = ndn(amount, diceMaxValue);
    if (result.error) {
      void message.reply(result.error);
      return;
    }
    void message.channel.send(result.message);
    return;
  }

  if (format.length === 1) {
    const max1 = parseInt(format[0][0]);
    const max2 = parseInt(format[0][1]);
    const result = dnn(max1, max2);
    if (result.error) {
      void message.reply(result.error);
      return;
    }
    void message.channel.send(result.message);
    return;
  }

  void message.reply('ダイスにできない文字列だったよ');
};
