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
var decorators_1 = require("../decorators");
var module_1 = require("./module");
var Debugable = /** @class */ (function () {
    function Debugable() {
        this.$log = this.$logFactory('log');
        this.$warn = this.$logFactory('warn');
        this.$error = this.$logFactory('error');
        this.$debug = this.$logFactory('debug');
    }
    Object.defineProperty(Debugable.prototype, "$debugEnabled", {
        /**
         * `true` if the debug is enabled for this class
         */
        get: function () { return module_1.errorTypeFor(this.$debugType); },
        enumerable: true,
        configurable: true
    });
    Debugable.prototype.$logFactory = function (level) {
        var _this = this;
        return function (message, force) {
            if (force === void 0) { force = false; }
            return module_1.print(_this.$connectionName, _this.$debugType, message, level, force);
        };
    };
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", String)
    ], Debugable.prototype, "$debugType", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", String)
    ], Debugable.prototype, "$connectionName", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Debugable.prototype, "$debugEnabled", null);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Debugable.prototype, "$logFactory", null);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$log", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$warn", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$error", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$debug", void 0);
    return Debugable;
}());
exports.Debugable = Debugable;
var DebugInstance = /** @class */ (function (_super) {
    __extends(DebugInstance, _super);
    function DebugInstance($debugType, $connectionName) {
        var _this = _super.call(this) || this;
        _this.$debugType = $debugType;
        _this.$connectionName = $connectionName;
        return _this;
    }
    return DebugInstance;
}(Debugable));
exports.DebugInstance = DebugInstance;
//# sourceMappingURL=debugable.js.map