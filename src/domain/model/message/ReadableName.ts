import { IValueObject } from '../';

export class ReadableName implements IValueObject<string> {
    static readonly MIN_LENGTH = 1;
    static readonly MAX_LENGTH = 15;
    static readonly HONORIFIC = 'さん';

    constructor(private readonly value: string) {
        const name = ReadableName.sanitize(value);
        if (name.length < ReadableName.MIN_LENGTH) {
            this.value = 'すうじねーむ';
            return;
        }
        if (name.length > ReadableName.MAX_LENGTH) {
            this.value = 'なまえながすぎ'
            return;
        }
        this.value = name;
    }

    static readonly sanitize = (name: string): string => {
        return name.replace(/\d+$/, '');
    }

    readonly equals = (other: unknown): boolean => {
        return other instanceof ReadableName
               && other.value === this.value;
    }

    readonly toString = (): string => `${this.value}${ReadableName.HONORIFIC}`;

    readonly valueOf = (): string => this.value;
}
