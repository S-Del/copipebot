import { Message } from "discord.js";
import { UNICODE_NUMBER_EMOJI_LIST } from "../common/common";

export class Survey {
  private readonly rowMessageList:readonly string[];
  private readonly errorMessageList:string[];
  private surveyTitle:string;
  private surveyOptions:string[];

  constructor(messageList:string[]) {
    this.rowMessageList = messageList;
    this.surveyTitle = '';
    this.surveyOptions = [];

    this.errorMessageList = [];
    this.validate();
  }

  private readonly validate = () => {
    if (!this.rowMessageList) {
      this.errorMessageList.push('タイトルや選択肢が入力されていなかったよ');
    }

    if (this.rowMessageList.length > 9) {
      this.errorMessageList.push('選択肢が多すぎるよ');
      return;
    }

    if (this.rowMessageList.length < 3) {
      this.errorMessageList.push('選択肢が少なすぎるよ')
      return;
    }

    this.surveyTitle = `**${this.rowMessageList[0]}**`;
    this.surveyOptions =
        this.rowMessageList
        .slice(1)
        .map((value, index) =>
            `${UNICODE_NUMBER_EMOJI_LIST[index + 1]} ${value}`);
  }

  readonly response = ():string => {
    if (this.errorMessageList.length > 0) {
      return this.errorMessageList.join('\n');
    }

    return [
      `${this.surveyTitle}`,
      '- - - - - - - - - -',
      `${this.surveyOptions.join('\n')}`,
      `${UNICODE_NUMBER_EMOJI_LIST[this.surveyOptions.length + 1]} これら以外`,
      '= = = = = = = = = ='
    ].join('\n');
  }

  readonly react = (sent:Message):void => {
    if (this.errorMessageList.length > 0) {
      return;
    }

    this.surveyOptions.forEach(async (value, index) => {
      await sent.react(`${UNICODE_NUMBER_EMOJI_LIST[index + 1]}`);
    });
    sent.react(`${UNICODE_NUMBER_EMOJI_LIST[this.surveyOptions.length + 1]}`);
  }
}
