export class SubCommandValidator {
  private readonly NAME_LIST:readonly SubCommand[];
//private readonly REGEXP_LIST:readonly RegExp[];
  private readonly NAME_MAX_LEN:number;
  private readonly NAME_MIN_LEN:number;

  constructor () {
    this.NAME_LIST = ['emoji', 'dice', 'survey'];
//  this.REGEXP_LIST = [/^(emoji|-e)$/, /^(dice|-d)$/, /^(survey|-s)$/];
    this.NAME_MAX_LEN = this.NAME_LIST.map(x => x.length)
                                      .reduce((acc, cur) => acc>cur ? acc:cur);
    this.NAME_MIN_LEN = this.NAME_LIST.map(x => x.length)
                                      .reduce((acc, cur) => acc<cur ? acc:cur);
  }

  readonly isValid = (str:string):boolean => {
    if (str.length < this.NAME_MIN_LEN) { return false; }
    if (str.length > this.NAME_MAX_LEN) { return false; }
//  if (!this.REGEXP_LIST.some(pattern => str.match(pattern))) { return false };
    return true;
  }
}
