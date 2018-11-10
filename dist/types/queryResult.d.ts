/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
export declare class QueryResult<T> {
    readonly error?: Error | undefined;
    private _ok;
    private _result;
    private handlers;
    constructor(ok: boolean, result: Promise<T>, error?: Error | undefined);
    /**
     * Determines whether the incapsulated data is OK and contains no errors
     */
    readonly ok: boolean;
    /**
     * The resulting data of the query request
     */
    result: Promise<T>;
    /**
     * Fires a handler whenever the data in the result has been changed
     *
     * @param callback the callback to fire
     */
    onChange(callback: Function): void;
    /**
     * Unsubscribe the callback from the result data changes
     */
    offChange(callback: Function): void;
}
