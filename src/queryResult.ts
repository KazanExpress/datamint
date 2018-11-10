/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
export class QueryResult<T> {
  private _ok: boolean;
  private _result: Promise<T>;
  private handlers: Function[] = [];

  constructor(ok: boolean, result: Promise<T>, public readonly error?: Error) {
    this._ok = ok;
    this._result = result;
  }

  /**
   * Determines whether the incapsulated data is OK and contains no errors
   */
  public get ok() { return this._ok; }

  /**
   * The resulting data of the query request
   */
  public get result() { return this._result; }
  public set result(value: Promise<T>) {
    this._result = value;
    this.handlers.forEach(async h => h());
  }

  
  /**
   * Fires a handler whenever the data in the result has been changed
   *
   * @param callback the callback to fire
   */
  public onChange(callback: Function) {
    this.handlers.push(callback);
  }
  
  /**
   * Unsubscribe the callback from the result data changes
   */
  public offChange(callback: Function) {
    const idx = this.handlers.indexOf(callback);

    if (idx > -1) {
      this.handlers.splice(idx, 1);
    }
  }
}