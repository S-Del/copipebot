import { randomInt, sum, min, max, median, mode, mean} from 'mathjs';

export class NDN {
  private readonly errorMessageList:string[];
  private readonly count:number;
  private readonly maxValue:number;

  constructor(count:string, maxValue:string) {
    this.count = Number(count);
    this.maxValue = Number(maxValue);

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = () => {
    if (!this.count) {
      this.errorMessageList.push('ダイスを振る回数が 0 か数字以外の文字だったよ');
      return;
    }

    if (!this.maxValue) {
      this.errorMessageList.push('ダイスの面数が 0 か数字以外の文字だったよ');
      return;
    }

    if (this.count > 100) {
      this.errorMessageList.push('ダイスを振る回数が多すぎるよ');
    }

    if (this.count < 1) {
      this.errorMessageList.push('ダイスを振る回数が少なすぎるよ');
    }

    if (this.maxValue > 100) {
      this.errorMessageList.push('ダイスの面数が多すぎるよ');
    }

    if (this.maxValue < 2) {
      this.errorMessageList.push('ダイスの面数が少なすぎるよ');
    }
  }

  private readonly roll = ():string => {
    if (this.count == 1) {
      return `出た目: ${randomInt(1, this.maxValue + 1)}`;
    }

    const result = new Array<number>(this.count)
                   .fill(NaN)
                   .map(() => randomInt(1, this.maxValue + 1));
    const total = sum(result);
    const minValue = min(result);
    const maxValue = max(result);
    const centerValue = median(result);
    const modeValues = mode(result).sort((a:number, b:number) => a - b);
    const average = mean(result);

    // 100 の目を 0 とする場合の処理
    if (this.maxValue == 100) {
      const result2 = result.map(x => (x>=100) ? 0:x);

      return [
        '出た目:',
        '\`\`\`',
        result.join(', '),
        '\`\`\`',
        `最 頻: [${modeValues.join(', ')}] (${
          mode(result2).sort((a:number, b:number) => a - b)
                       .join(', ')
        })`,
        `合 計: **${total}** (${sum(result2)})`,
        `最 小: **${minValue}** (${min(result2)})`,
        `最 大: **${maxValue}** (${max(result2)})`,
        `中 央: **${centerValue}** (${median(result2)})`,
        `平 均: **${average}** (${mean(result2)})`,
        '`()` 内は 100 を 0 とした場合の値'
      ].join('\n');
    }

    return [
      '出た目:',
      '\`\`\`',
      result.join(', '),
      '\`\`\`',
      `最 頻: [${modeValues.join(', ')}]`,
      `合 計: **${total}**`,
      `最 小: **${minValue}**`,
      `最 大: **${maxValue}**`,
      `中 央: **${centerValue}**`,
      `平 均: **${average}**`
    ].join('\n');
  }

  readonly response = ():string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    return this.roll();
  }
}
