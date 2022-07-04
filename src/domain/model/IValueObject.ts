export interface IValueObject<T> {
    /**
     * 引数とこの値オブジェクトを比較して等値なら true を返す
     */
    readonly equals: (other: unknown) => boolean;

    /**
     * この値オブジェクトが持つ値に単位を加えて文字列で返す
     * 単位が無い場合は値を文字列として返す
     */
    readonly toString: () => string;

    /**
     * この値オブジェクトが持つ値を返す
     */
    readonly valueOf: () => T;
}
