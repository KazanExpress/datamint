var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { enumerable } from './decorators';
/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
export class QueryResult {
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
__decorate([
    enumerable(false),
    __metadata("design:type", Boolean)
], QueryResult.prototype, "_ok", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], QueryResult.prototype, "_result", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Error)
], QueryResult.prototype, "_error", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Array)
], QueryResult.prototype, "handlers", void 0);
//# sourceMappingURL=queryResult.js.map