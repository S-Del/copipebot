import { Message } from 'discord.js';

export const NUMBER_EMOJI_LIST = [
  ':zero:', ':one:', ':two:', ':three:', ':four:',
  ':five:', ':six:', ':seven:', ':eight:', ':nine:'
] as const;

export const UNICODE_NUMBER_EMOJI_LIST = [
  '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'
] as const;

export const toEmojiString = (target: string): string => {
  const PREFIX = 'regional_indicator';
  const emojiList = Array.from(target, (c) => {
    if (/[a-z]/.test(c)) {
      return `:${PREFIX}_${c}:`;
    } else if (/[A-Z]/.test(c)) {
      return `:${PREFIX}_${c.toLowerCase()}:`;
    } else if (/[0-9]/.test(c)) {
      return `${NUMBER_EMOJI_LIST[Number(c)]}`;
    } else if (/\s/.test(c)) {
      return '      ';
    } else if (/!/.test(c)) {
      return ':grey_exclamation:';
    } else if (/\?/.test(c)) {
      return ':grey_question:';
    } else {
      return;
    }
  });

  return emojiList.join(' ');
};

const validate = (target: string): string => {
  if (!target) return '絵文字にできる文字が無かったよ';
  if (target.length > 80) return '変換する文字列が長すぎるよ';
  if (/[^a-zA-Z0-9\s!?]/g.test(target)) {
    return '絵文字にできない文字が含まれていたよ';
  }

  return '';
};

export const emoji = (message: Message, target: string): void => {
  const error = validate(target);
  if (error) {
    void message.reply(error);
    return;
  }

  void message.channel.send(toEmojiString(target));
};
