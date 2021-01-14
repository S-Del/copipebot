import { randomInt } from 'mathjs';

export class DNN {
  private readonly errorMessageList:string[];
  private readonly maxValue1:number;
  private readonly maxValue2:number;

  constructor(format:string) {
    this.maxValue1 = Number(format[0]);
    this.maxValue2 = Number(format[1]);

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = () => {
    if (!this.maxValue1) {
      this.errorMessageList.push('1個目のダイスに数字が指定されていなかったよ');
    }

    if (!this.maxValue2) {
      this.errorMessageList.push('2個目のダイスに数字が指定されていなかったよ');
    }

    if (this.maxValue1 > 9) {
      this.errorMessageList.push('1個目のダイスの面数が多すぎるよ');
    }

    if (this.maxValue1 < 2) {
      this.errorMessageList.push('1個目のダイスの面が少なすぎるよ');
    }

    if (this.maxValue2 > 9) {
      this.errorMessageList.push('2個目のダイスの面数が多すぎるよ');
    }

    if (this.maxValue2 < 2) {
      this.errorMessageList.push('2個目のダイスの面数が少なすぎるよ');
    }
  }

  private readonly roll = ():string => {
    const result1 = randomInt(1, this.maxValue1);
    const result2 = randomInt(1, this.maxValue2);
    const result3 = result1 > result2
                    ? `${result2}${result1}`
                    : `${result1}${result2}`;

    return [
      `${NUMBER_EMOJI_LIST[result1]} ${NUMBER_EMOJI_LIST[result2]}`,
      `結果: ${result3}`
    ].join('\n');
  }

  readonly response = ():string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    return this.roll();
  }
}
