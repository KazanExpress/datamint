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
const decorators_1 = require("../decorators");
const module_1 = require("./module");
class Debugable {
    constructor() {
        this.$logFactory = (level) => (message, force = false) => module_1.print(this.$connectionName, this.$debugType, message, level, force);
        this.$log = this.$logFactory('log');
        this.$warn = this.$logFactory('warn');
        this.$error = this.$logFactory('error');
        this.$debug = this.$logFactory('debug');
    }
    /**
     * `true` if the debug is enabled for this class
     */
    get $debugEnabled() { return module_1.errorTypeFor(this.$debugType); }
}
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
    __metadata("design:type", Object)
], Debugable.prototype, "$logFactory", void 0);
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
exports.Debugable = Debugable;
//# sourceMappingURL=debugable.js.map