import { IValueObject } from '../IValueObject';

export class ReadableMessage implements IValueObject<string> {
    static readonly MAX_LENGTH = 200;

    constructor(private readonly value: string) {
        if (value.length > ReadableMessage.MAX_LENGTH) {
            this.value = ReadableMessage.sanitize(
                value.slice(0, ReadableMessage.MAX_LENGTH - 4)
            ) + ' 以下略';
            return;
        }
        this.value = ReadableMessage.sanitize(value);
    }

    static readonly sanitize = (message: string): string => {
        return message.replace(/https?:\/\/\S+/g, 'URL省略')
                      .replace(/ʬ+/g, 'わらわら')
                      .replace(/[wWｗＷ]{2,}/g, 'わらわら')
                      .replace(/[wWｗＷ]$/, 'わら')
                      .replace(/[(（]?[笑]+[)）]?$/, 'わら');
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof ReadableMessage
               && other.value === this.value;
    }

    readonly toString = (): string => this.value;

    readonly valueOf = (): string => this.value;
}
