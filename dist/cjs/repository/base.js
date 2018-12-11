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
var drivers_1 = require("../drivers");
var multiDriver_1 = require("../drivers/multiDriver");
var Repository = /** @class */ (function (_super) {
    __extends(Repository, _super);
    function Repository(name, connectionName, Data, api) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.connectionName = connectionName;
        _this.Data = Data;
        _this.api = api;
        _this.columns = [];
        _this.debugType = "db:" + _this.name.toLowerCase();
        if (!api) {
            _this.$warn('The main functionality is disabled. Are you sure you want to use this without API?');
        }
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === _this.constructor.prototype) {
            if (_this.isDebugEnabled) {
                _this.$error("Using default empty repository.");
            }
            else {
                debug_1.Debug.$error("Using default empty repository for " + name);
            }
        }
        if (Data.prototype.__col__) {
            if (true) {
                _this.columns = Data.prototype.__col__.slice();
                delete Data.prototype.__col__;
            }
        }
        else {
            _this.columns = Object.keys(new Data({}, _this));
        }
        return _this;
    }
    Repository.prototype.makeDataInstance = function (options) {
        return new this.Data(options, this);
    };
    return Repository;
}(debug_1.Debugable));
exports.Repository = Repository;
function selectDriver(drivers, repoName) {
    var error = function () {
        var msg = "No supported driver provided for " + repoName + ".";
        if (debug_1.Debug.map['*'] !== 'hard') {
            msg += ' Using fallback.';
        }
        debug_1.Debug.$error(msg);
    };
    if (Array.isArray(drivers)) {
        // Select the first supported driver from the bunch
        var SupportedDrivers = drivers.filter(function (d) { return d.isSupported; });
        if (SupportedDrivers.length > 0) {
            return SupportedDrivers[0];
        }
        else {
            return error(), drivers_1.FallbackDriver;
        }
    }
    else if (drivers instanceof multiDriver_1.MultiDriver) {
        return drivers;
    }
    else {
        return error(), drivers_1.FallbackDriver;
    }
}
exports.selectDriver = selectDriver;
//# sourceMappingURL=base.js.map