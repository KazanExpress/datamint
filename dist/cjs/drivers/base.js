"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("../debug");
var Driver = /** @class */ (function (_super) {
    __extends(Driver, _super);
    function Driver(connection) {
        var _this = _super.call(this) || this;
        _this.connection = connection;
        _this.debugType = 'driver';
        _this.connectionName = _this.connection.name;
        return _this;
    }
    Object.defineProperty(Driver, "isSupported", {
        /**
         * Determines if the driver is supported in current environment
         */
        get: function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return Driver;
}(debug_1.Debugable));
exports.Driver = Driver;
//# sourceMappingURL=base.js.map