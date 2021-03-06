"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
var QueryResult = /** @class */ (function () {
    function QueryResult(ok, result, error) {
        this.handlers = [];
        this._ok = ok;
        this._result = result;
        this._error = error;
    }
    Object.defineProperty(QueryResult.prototype, "ok", {
        /**
         * Determines whether the incapsulated data is OK and contains no errors
         */
        get: function () { return this._ok; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryResult.prototype, "result", {
        /**
         * The resulting data of the query request
         */
        get: function () { return this._result; },
        set: function (value) {
            var _this = this;
            this._ok = true;
            this._result = value;
            this.handlers.forEach(function (h) { return h(_this.error, _this.result); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryResult.prototype, "error", {
        /**
         * The error of the query (if any)
         */
        get: function () { return this._error; },
        set: function (value) {
            var _this = this;
            this._ok = false;
            this._error = value;
            this.handlers.forEach(function (h) { return h(_this.error, _this.result); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fires a handler whenever the data in the result has been changed
     *
     * @param callback the callback to fire
     */
    QueryResult.prototype.onChange = function (callback) {
        this.handlers.push(callback);
    };
    /**
     * Unsubscribe the callback from the result data changes
     */
    QueryResult.prototype.offChange = function (callback) {
        var idx = this.handlers.indexOf(callback);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    };
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Boolean)
    ], QueryResult.prototype, "_ok", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], QueryResult.prototype, "_result", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Error)
    ], QueryResult.prototype, "_error", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Array)
    ], QueryResult.prototype, "handlers", void 0);
    return QueryResult;
}());
exports.QueryResult = QueryResult;
//# sourceMappingURL=queryResult.js.map