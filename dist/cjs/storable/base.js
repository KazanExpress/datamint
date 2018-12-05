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
var decorators_1 = require("../decorators");
var Storable = /** @class */ (function () {
    function Storable(__options) {
        this.__options = __options;
    }
    Storable.Property = function (target, key) {
        var constructor = target.constructor;
        if (!constructor.__col__) {
            constructor.__col__ = [];
        }
        constructor.__col__.push(key);
    };
    Storable.__col__ = [];
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Storable.prototype, "__options", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Array)
    ], Storable, "__col__", void 0);
    return Storable;
}());
exports.Storable = Storable;
//# sourceMappingURL=base.js.map