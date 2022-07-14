import { IValueObject } from '../IValueObject';

export class EmojiMessage implements IValueObject<string> {
    static readonly MIN_LENGTH = 1;
    static readonly MAX_LENGTH = 80;
    static readonly NUMBERS = [
        '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'
    ] as const;
    static readonly MARKS = {
        asterisk: '*️⃣',
        exclamation: '❗',
        hash: '#⃣',
        question: '❓',
        space: '     '
    } as const;
    static readonly VALID_CHARS = /[a-z0-9*!#?\s]/i;

    constructor(private readonly value: string) {
        if (!EmojiMessage.isValid(value)) throw new Error();
    }

    static readonly isValid = (value: string): boolean => {
        return Boolean(value)
               && value.length >= EmojiMessage.MIN_LENGTH
               && value.length <= EmojiMessage.MAX_LENGTH
               && EmojiMessage.VALID_CHARS.test(value);
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof EmojiMessage
               && other.value === this.value;
    }

    readonly toString = (): string => {
        return Array.from(this.value, (c) => {
            switch (true) {
                case /[a-z]/i.test(c):
                    return `:regional_indicator_${c.toLowerCase()}:`;
                case /[0-9]/.test(c):
                    return EmojiMessage.NUMBERS[+c];
                case /\*/.test(c):
                    return EmojiMessage.MARKS.asterisk;
                case /!/.test(c):
                    return EmojiMessage.MARKS.exclamation;
                case /#/.test(c):
                    return EmojiMessage.MARKS.hash;
                case /\?/.test(c):
                    return EmojiMessage.MARKS.question;
                case /\s/.test(c):
                    return EmojiMessage.MARKS.space;
                default:
                    return void 0;
            }
        }).filter(Boolean)
          .join(' ');
    }

    readonly valueOf = (): string => this.toString();
}
