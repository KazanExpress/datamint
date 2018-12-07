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
export class Storable {
    constructor(__options, ..._) {
        this.__col__ = [];
        this.__options = __options;
    }
    static Property(target, key) {
        if (!target.__col__) {
            target.__col__ = [];
        }
        target.__col__.push(key);
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Array)
], Storable.prototype, "__col__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Storable.prototype, "__options", void 0);
//# sourceMappingURL=base.js.map