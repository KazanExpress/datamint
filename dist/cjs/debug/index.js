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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var debugable_1 = require("./debugable");
var module_1 = require("./module");
var GlobalDebug = /** @class */ (function (_super) {
    __extends(GlobalDebug, _super);
    function GlobalDebug() {
        var _this = _super.call(this) || this;
        _this.$debugType = '*';
        _this.$connectionName = '';
        return _this;
    }
    Object.defineProperty(GlobalDebug.prototype, "map", {
        get: function () {
            return module_1.debugMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalDebug.prototype, "state", {
        get: function () {
            return module_1.debugState;
        },
        enumerable: true,
        configurable: true
    });
    GlobalDebug.instance = new GlobalDebug();
    return GlobalDebug;
}(debugable_1.Debugable));
exports.Debug = GlobalDebug.instance;
__export(require("./debugable"));
__export(require("./module"));
//# sourceMappingURL=index.js.map