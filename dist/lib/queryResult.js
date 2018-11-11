"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
class QueryResult {
    constructor(ok, result, error) {
        this.handlers = [];
        this._ok = ok;
        this._result = result;
        this._error = error;
    }
    /**
     * Determines whether the incapsulated data is OK and contains no errors
     */
    get ok() { return this._ok; }
    /**
     * The resulting data of the query request
     */
    get result() { return this._result; }
    set result(value) {
        this._ok = true;
        this._result = value;
        this.handlers.forEach(h => h(this.error, this.result));
    }
    /**
     * The error of the query (if any)
     */
    get error() { return this._error; }
    set error(value) {
        this._ok = false;
        this._error = value;
        this.handlers.forEach(h => h(this.error, this.result));
    }
    /**
     * Fires a handler whenever the data in the result has been changed
     *
     * @param callback the callback to fire
     */
    onChange(callback) {
        this.handlers.push(callback);
    }
    /**
     * Unsubscribe the callback from the result data changes
     */
    offChange(callback) {
        const idx = this.handlers.indexOf(callback);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    }
}
exports.QueryResult = QueryResult;
//# sourceMappingURL=queryResult.js.map