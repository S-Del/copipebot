import { NUMBER_EMOJI_LIST } from "../common/common";

export class EmojiString {
  private readonly PREFIX:string;
  private readonly rowMessage:string;
  private readonly errorMessageList:string[];

  constructor(message:string) {
    this.PREFIX = 'regional_indicator';
    this.rowMessage = message;

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = ():void => {
    if (!this.rowMessage) {
      this.errorMessageList.push('変換できる文字列が無かったよ')
      return;
    }

    if (this.rowMessage.length < 1) {
      this.errorMessageList.push('変換する文字列が短すぎるよ');
      return;
    }

    if (this.rowMessage.length > 80) {
      this.errorMessageList.push('変換する文字列が長すぎるよ');
      return;
    }

    if (this.rowMessage.match(/[^a-zA-Z0-9\s!\?]/g)) {
      this.errorMessageList.push('絵文字にできない文字が含まれていたよ');
      return;
    }
  };

  private readonly create = ():string => {
    const emojiList = Array.from(this.rowMessage, c => {
      if (c.match(/[a-z]/)) {
        return `:${this.PREFIX}_${c}:`;
      } else if (c.match(/[A-Z]/)) {
        return `:${this.PREFIX}_${c.toLowerCase()}:`;
      } else if (c.match(/[0-9]/)) {
        return `${NUMBER_EMOJI_LIST[Number(c)]}`;
      } else if (c.match(/\s/)) {
        return '      ';
      } else if (c.match(/!/)) {
        return ':grey_exclamation:';
      } else if (c.match(/\?/)) {
        return ':grey_question:';
      } else {
        return;
      }
    });

    return emojiList.join(' ');
  };

  readonly response = ():string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    return this.create();
  };
}
