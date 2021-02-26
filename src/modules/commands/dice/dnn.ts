import { randomInt } from "mathjs";
import { NUMBER_EMOJI_LIST } from "../emoji/emoji";

const validate = (max1: number, max2: number): string => {
  const MIN_DICE_VALUE = 2;
  const MAX_DICE_VALUE = 9;
  if (max1 < MIN_DICE_VALUE) return '1 個目のダイスの面数が少なすぎるよ';
  if (max1 > MAX_DICE_VALUE) return '1 個目のダイスの面数が多すぎるよ';
  if (max2 < MIN_DICE_VALUE) return '2 個目のダイスの面数が少なすぎるよ';
  if (max2 > MAX_DICE_VALUE) return '2 個目のダイスの面数が多すぎるよ';
  return '';
};

const roll = (max1: number, max2: number): string => {
  const dice1 = randomInt(1, max1 + 1);
  const dice2 = randomInt(1, max2 + 1);
  const result = dice1 > dice2 ? `${dice2}${dice1}`:`${dice1}${dice2}`;

  return [
    `${NUMBER_EMOJI_LIST[dice1]} ${NUMBER_EMOJI_LIST[dice2]}`,
    `結果: **${result}**`
  ].join('\n')
};

export const dnn = (max1: number, max2: number): DiceResult => {
  const resultObject: DiceResult = {
    error: '',
    message: ''
  };

  resultObject.error = validate(max1, max2);
  if (resultObject.error) return resultObject;

  resultObject.message = roll(max1, max2);
  return resultObject;
};
