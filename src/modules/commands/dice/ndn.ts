import { randomInt, sum, min, max, median, mode, mean } from 'mathjs';

const roll = (diceMaxValue: number): number => randomInt(1, diceMaxValue + 1);

const multipleRoll = (amount: number, diceMaxValue: number): number[] => {
  return new Array<number>(amount)
             .fill(NaN)
             .map(() => randomInt(1, diceMaxValue + 1));
};

const convert100to0 = (result: number[]): number[] => {
  return result.map(x => x === 100 ? 0:x);
};

const resultMessage = (result: number[], result100?: number[]): string => {
  const modeValues = (mode(result) as number[])
                     .sort((a: number, b: number) => a - b);
  const total = sum(result) as number;
  const minValue = min(result) as number;
  const maxValue = max(result) as number;
  const centerValue = median(result) as number;
  const average = mean(result) as number;

  if (result100) {
    const modeValues100 = (mode(result100) as number[])
                          .sort((a: number, b: number) => a - b);
    const total100 = sum(result100) as number;
    const minValue100 = min(result100) as number;
    const maxValue100 = max(result100) as number;
    const centerValue100 = median(result100) as number;
    const average100 = mean(result100) as number;
    return [
      '出た目:',
      '```',
      `${String(result)}`,
      '```',
      `最 頻: [${String(modeValues)}] (${String(modeValues100)})`,
      `合 計: **${total}** (${total100})`,
      `最 小: **${minValue}** (${minValue100})`,
      `最 大: **${maxValue}** (${maxValue100})`,
      `中 央: **${centerValue}** (${centerValue100})`,
      `平 均: **${average}** (${average100})`,
      '`()` 内は 100 を 0 とした場合の値'
    ].join('\n');
  }

  return [
    '出た目:',
    '```',
    `${String(result)}`,
    '```',
    `最 頻: [${String(modeValues)}]`,
    `合 計: **${total}**`,
    `最 小: **${minValue}**`,
    `最 大: **${maxValue}**`,
    `中 央: **${centerValue}**`,
    `平 均: **${average}**`
  ].join('\n');
};

const validate = (amount: number, diceMaxValue: number): string => {
  const MIN_DICE_AMOUNT = 1;
  const MAX_DICE_AMOUNT = 100;
  if (amount < MIN_DICE_AMOUNT) return 'ダイスを振る回数が少なすぎるよ';
  if (amount > MAX_DICE_AMOUNT) return 'ダイスを振る回数が多すぎるよ';

  const MIN_DICE_VALUE = 1;
  const MAX_DICE_VALUE = 100;
  if (diceMaxValue < MIN_DICE_VALUE) return 'ダイスの面数が少なすぎるよ';
  if (diceMaxValue > MAX_DICE_VALUE) return 'ダイスの面数が多すぎるよ';

  return '';
};

export const ndn = (amount: number, diceMaxValue: number): DiceResult => {
  const resultObject: DiceResult = {
    error: '',
    message: ''
  };

  resultObject.error = validate(amount, diceMaxValue);
  if (resultObject.error) return resultObject;

  if (amount === 1) {
    resultObject.message = `出た目: ${roll(diceMaxValue)}`;
    return resultObject;
  }

  const rollResult = multipleRoll(amount, diceMaxValue);
  if (diceMaxValue === 100) {
    const rollResult100 = convert100to0(rollResult);
    resultObject.message = resultMessage(rollResult, rollResult100);
    return resultObject;
  }

  resultObject.message = resultMessage(rollResult);
  return resultObject;
};
