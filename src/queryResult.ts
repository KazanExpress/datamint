type PromiseExecutor<T> = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;

/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
export class QueryResult<T> {
  private _ok: boolean;
  private _result: Promise<T>;
  private _error?: Error;
  private handlers: ((error?: Error, result?: T) => any)[] = [];

  constructor(ok: boolean, result: PromiseExecutor<T>, error?: Error);
  constructor(ok: boolean, result: Promise<T>, error?: Error);
  constructor(
    ok: boolean,
    result: Promise<T> | PromiseExecutor<T>,
    error?: Error
  ) {
    this._ok = ok;

    let promise: Promise<T>;

    if (typeof result === 'function') {
      promise = new Promise(result);
    } else {
      promise = result;
    }

    this._result = promise;

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
  public set result(value: Promise<T>) {
    this._ok = true;
    this._result = value;
    this.handlers.forEach(this.callHandler);
  }

  /**
   * The error of the query (if any)
   */
  public get error() { return this._error; }
  public set error(value) {
    this._ok = false;
    this._error = value;
    this.handlers.forEach(this.callHandler);
  }

  private async callHandler(h) {
    try {
      const res = await this.result;
      h(this.error, res);
    } catch (e) {
      this._ok = false;
      h(e);
    }
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
