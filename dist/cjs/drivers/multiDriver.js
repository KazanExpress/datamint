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
var base_1 = require("./base");
var MultiDriver = /** @class */ (function (_super) {
    __extends(MultiDriver, _super);
    function MultiDriver(connection, drivers) {
        var _this = _super.call(this, connection) || this;
        _this.create = _this.request('create');
        _this.findById = _this.request('findById');
        _this.update = _this.request('update');
        _this.updateOne = _this.request('updateOne');
        _this.deleteOne = _this.request('deleteOne');
        _this.delete = _this.request('delete');
        _this.drivers = drivers.filter(function (d) { return d.isSupported; }).map(function (D) { return new D(connection); });
        return _this;
    }
    MultiDriver.prototype.request = function (type) {
        return function () {
            var args = arguments;
            var allResponses = Promise.all(this.drivers.map(function (d) { return d[type].apply(d, args); }));
            return allResponses[0];
        }.bind(this);
    };
    Object.defineProperty(MultiDriver, "isSupported", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    return MultiDriver;
}(base_1.Driver));
exports.MultiDriver = MultiDriver;
//# sourceMappingURL=multiDriver.js.map