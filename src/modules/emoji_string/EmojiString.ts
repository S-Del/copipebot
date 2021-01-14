export class EmojiString {
  private readonly PREFIX:string;
  private errorList:string[];

  constructor() {
    this.PREFIX = ':regional_indicator_';
    this.errorList = [];
  }

  private readonly validate = (message:string):void => {
    if (message.length < 1) {
      this.errorList.push('変換する文字列がないよ');
    }
    if (message.match(/[^a-zA-Z0-9\s!\?]/g)) {
      this.errorList.push('絵文字にできない文字が含まれていたよ');
    }
  };

  private readonly create = (message:string):string => {
    const emojiList = [];
    for (const c of message) {
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

  readonly response = (message:string):string => {
    this.validate(message);
    if (this.errorList.length > 0) {
      return this.errorList.join('\n');
    }

    return this.create(message);
  };
}
