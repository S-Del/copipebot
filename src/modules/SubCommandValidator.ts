import { SUB_COMMAND_NAME_LIST } from "./common/common";

export class SubCommandValidator {
//private readonly REGEXP_LIST:readonly RegExp[];
  private readonly NAME_MAX_LEN:number;
  private readonly NAME_MIN_LEN:number;

  constructor () {
//  this.REGEXP_LIST = [/^(emoji|-e)$/, /^(dice|-d)$/, /^(survey|-s)$/];
    this.NAME_MAX_LEN =
        SUB_COMMAND_NAME_LIST.map(x => x.length)
                             .reduce((acc, cur) => Math.max(acc, cur));
    this.NAME_MIN_LEN =
        SUB_COMMAND_NAME_LIST.map(x => x.length)
                             .reduce((acc, cur) => Math.min(acc, cur));
  }

  readonly isValid = (str:string):boolean => {
    if (str.length < this.NAME_MIN_LEN) { return false; }
    if (str.length > this.NAME_MAX_LEN) { return false; }
//  if (!this.REGEXP_LIST.some(pattern => pattern.test(str))) { return false };
    return true;
  }
}
