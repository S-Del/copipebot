export class CommandValidator {
  private readonly NAME_LIST: readonly Command[];
  private readonly NAME_MAX_LEN: number;
  private readonly NAME_MIN_LEN: number;

  constructor() {
    this.NAME_LIST = ['cb', 'copipebot'];
    this.NAME_MAX_LEN = this.NAME_LIST.map(
      (x) => x.length
    ).reduce((acc, cur) => Math.max(acc, cur));
    this.NAME_MIN_LEN = this.NAME_LIST.map(
      (x) => x.length
    ).reduce((acc, cur) => Math.min(acc, cur));
  }

  readonly isValid = (str: string): boolean => {
    if (str.length < this.NAME_MIN_LEN) {
      return false;
    }
    if (str.length > this.NAME_MAX_LEN) {
      return false;
    }
    if (!/^(cb|copipebot)$/.test(str)) {
      return false;
    }
    return true;
  };
}
