import { DNN } from './formats/DNN';
import { NDN } from './formats/NDN';

export class Dice {
  private readonly rowMessage: string;
  private readonly errorMessageList: string[];

  constructor(message: string) {
    this.rowMessage = message;

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = () => {
    if (!this.rowMessage) {
      this.errorMessageList.push('ダイスにできる文字列が無かったよ');
      return;
    }

    if (this.rowMessage.length < 2) {
      this.errorMessageList.push('ダイスにする文字列が短すぎたよ');
      return;
    }

    if (this.rowMessage.length > 7) {
      this.errorMessageList.push('ダイスにする文字列が長すぎたよ');
      return;
    }

    if (/[^0-9dD]/.test(this.rowMessage)) {
      this.errorMessageList.push('ダイスにできない文字が含まれていたよ');
      return;
    }
  };

  readonly response = (): string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    const format = this.rowMessage.split(/[dD]/).filter(Boolean);

    if (format.length == 2) {
      const ndn = new NDN(format[0], format[1]);
      return ndn.response();
    }

    if (format.length == 1) {
      const dnn = new DNN(format[0]);
      return dnn.response();
    }

    return 'ダイスにできない文字列だったよ';
  };
}
