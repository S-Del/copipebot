import { Message } from 'discord.js';
import { UNICODE_NUMBER_EMOJI_LIST } from '../emoji/emoji';

const validate = (surveyList: string[]): string => {
  if (!surveyList) return 'タイトルや選択肢が無かったよ';
  if (surveyList.length > 9) return '選択肢が多いよ';
  if (surveyList.length < 3) return '選択肢が少ないよ';
  return '';
};

const surveyMessage = (surveyList: string[]): string => {
  const title = `**${surveyList[0]}**`;
  const options = surveyList.slice(1).map(
    (val, idx) => `${UNICODE_NUMBER_EMOJI_LIST[idx + 1]} ${val}`
  );
  return [
    `${title}`,
    '- - - - - - - - - -',
    `${options.join('\n')}`,
    `${UNICODE_NUMBER_EMOJI_LIST[options.length + 1]} これら以外`,
    '= = = = = = = = = =',
  ].join('\n');
};

export const survey = (message: Message, surveyList: string[]): void => {
  const error = validate(surveyList);
  if (error) {
    void message.reply(error);
    return;
  }

  const response = surveyMessage(surveyList);
  void message.channel.send(response)
  .then(sent => {
    for (let i = 0; i < surveyList.length; i++) {
      void sent.react(`${UNICODE_NUMBER_EMOJI_LIST[i + 1]}`);
    }
  });
};
