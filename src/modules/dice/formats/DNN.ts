import { randomInt } from 'mathjs';
import { NUMBER_EMOJI_LIST } from '../../common/common';

export class DNN {
  private readonly rowFormat:string;
  private maxValue1:number;
  private maxValue2:number;
  private readonly errorMessageList:string[];

  constructor(format:string) {
    this.rowFormat = format;
    this.maxValue1 = NaN;
    this.maxValue2 = NaN;

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = () => {
    if (this.rowFormat.length != 2) {
      this.errorMessageList.push('2 個のダイスの面数の指定ではなかったよ');
      return;
    }

    this.maxValue1 = Number(this.rowFormat[0]);
    this.maxValue2 = Number(this.rowFormat[1]);

    if (!this.maxValue1) {
      this.errorMessageList.push('1 個目のダイスの面数が 0 か数字以外の文字だったよ');
      return;
    }

    if (!this.maxValue2) {
      this.errorMessageList.push('2 個目のダイスの面数が 0 か数字以外の文字だったよ');
      return;
    }

    if (this.maxValue1 > 9) {
      this.errorMessageList.push('1 個目のダイスの面数が多すぎるよ');
    }

    if (this.maxValue1 < 2) {
      this.errorMessageList.push('1 個目のダイスの面数が少なすぎるよ');
    }

    if (this.maxValue2 > 9) {
      this.errorMessageList.push('2 個目のダイスの面数が多すぎるよ');
    }

    if (this.maxValue2 < 2) {
      this.errorMessageList.push('2 個目のダイスの面数が少なすぎるよ');
    }
  }

  private readonly roll = ():string => {
    const result1 = randomInt(1, this.maxValue1 + 1);
    const result2 = randomInt(1, this.maxValue2 + 1);
    const result3 = result1 > result2
                    ? `${result2}${result1}`
                    : `${result1}${result2}`;

    return [
      `${NUMBER_EMOJI_LIST[result1]} ${NUMBER_EMOJI_LIST[result2]}`,
      `結果: **${result3}**`
    ].join('\n');
  }

  readonly response = ():string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    return this.roll();
  }
}
