import { NUMBER_EMOJI_LIST } from "../common/common";

export class EmojiString {
  private readonly PREFIX:string;
  private readonly rowMessage:string;
  private readonly errorMessageList:string[];

  constructor(message:string) {
    this.PREFIX = ':regional_indicator_';
    this.rowMessage = message;

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = ():void => {
    if (this.rowMessage.length < 1) {
      this.errorMessageList.push('変換する文字列がないよ');
    }
    if (this.rowMessage.match(/[^a-zA-Z0-9\s!\?]/g)) {
      this.errorMessageList.push('絵文字にできない文字が含まれていたよ');
    }
  };

  private readonly create = ():string => {
    const emojiList = [];
    for (const c of this.rowMessage) {
      if (c.match(/[a-z]/)) {
        emojiList.push(`${this.PREFIX}${c}:`);
      } else if (c.match(/[A-Z]/)) {
        emojiList.push(`${this.PREFIX}${c.toLowerCase()}:`);
      } else if (c.match(/[0-9]/)) {
        emojiList.push(`${NUMBER_EMOJI_LIST[Number(c)]}`);
      } else if (c.match(/\s/)) {
        emojiList.push(`      `);
      } else if (c.match(/!/)) {
        emojiList.push(':grey_exclamation:');
      } else if (c.match(/\?/)) {
        emojiList.push(':grey_question:');
      } else {
        continue;
      }
    }

    return emojiList.join(' ');
  };

  readonly response = ():string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    return this.create();
  };
}
