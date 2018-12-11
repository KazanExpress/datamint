var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { enumerable } from '../decorators';
import { errorTypeFor, getPrintFunction } from './module';
export class Debugable {
    /**
     * `true` if the debug is enabled for this class
     */
    get isDebugEnabled() { return errorTypeFor(this.debugType); }
    $logFactory(level) {
        return getPrintFunction(this.connectionName, this.debugType, level);
    }
    get $log() { return this.$logFactory('log'); }
    get $warn() { return this.$logFactory('warn'); }
    get $error() { return this.$logFactory('error'); }
    get $debug() { return this.$logFactory('debug'); }
}
__decorate([
    enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "debugType", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", String)
], Debugable.prototype, "connectionName", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "isDebugEnabled", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Debugable.prototype, "$logFactory", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$log", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$warn", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$error", null);
__decorate([
    enumerable(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Debugable.prototype, "$debug", null);
export class DebugInstance extends Debugable {
    constructor(debugType, connectionName) {
        super();
        this.debugType = debugType;
        this.connectionName = connectionName;
    }
}
//# sourceMappingURL=debugable.js.map