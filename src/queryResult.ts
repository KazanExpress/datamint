import { enumerable } from './decorators';

/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
export class QueryResult<T> {
  @enumerable(false)
  private _ok: boolean;
  @enumerable(false)
  private _result: T;
  @enumerable(false)
  private _error?: Error;
  @enumerable(false)
  private handlers: ((error?: Error, result?: T) => any)[] = [];

  constructor(ok: boolean, result: T, error?: Error) {
    this._ok = ok;
    this._result = result;
    this._error = error;
  }

  /**
   * Determines whether the incapsulated data is OK and contains no errors
   */
  public get ok() { return this._ok; }

  /**
   * The resulting data of the query request
   */
  public get result() { return this._result; }
  public set result(value) {
    this._ok = true;
    this._result = value;
    this.handlers.forEach(h => h(this.error, this.result));
  }

  /**
   * The error of the query (if any)
   */
  public get error() { return this._error; }
  public set error(value) {
    this._ok = false;
    this._error = value;
    this.handlers.forEach(h => h(this.error, this.result));
  }

  /**
   * Fires a handler whenever the data in the result has been changed
   *
   * @param callback the callback to fire
   */
  public onChange(callback: (error?: Error, result?: T) => any) {
    this.handlers.push(callback);
  }

  /**
   * Unsubscribe the callback from the result data changes
   */
  public offChange(callback: (error?: Error, result?: T) => any) {
    const idx = this.handlers.indexOf(callback);

    if (idx > -1) {
      this.handlers.splice(idx, 1);
    }
  }
}
