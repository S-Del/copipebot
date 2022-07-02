export interface IValueObject<T> {
    readonly equals: (other: unknown) => boolean;
    readonly valueOf: () => T;
}
