/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
export declare class QueryResult<T> {
    private _ok;
    private _result;
    private _error?;
    private handlers;
    constructor(ok: boolean, result: T, error?: Error);
    /**
     * Determines whether the incapsulated data is OK and contains no errors
     */
    readonly ok: boolean;
    /**
     * The resulting data of the query request
     */
    result: T;
    /**
     * The error of the query (if any)
     */
    error: Error | undefined;
    /**
     * Fires a handler whenever the data in the result has been changed
     *
     * @param callback the callback to fire
     */
    onChange(callback: (error?: Error, result?: T) => any): void;
    /**
     * Unsubscribe the callback from the result data changes
     */
    offChange(callback: (error?: Error, result?: T) => any): void;
}
