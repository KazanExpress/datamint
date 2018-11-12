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
const util_1 = require("../util");
const storable_1 = require("./storable");
class Record extends storable_1.Storable {
    constructor(options, $repository) {
        super($repository);
    }
    $save() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
    $delete() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
}
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Record.prototype, "$save", null);
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Record.prototype, "$delete", null);
exports.Record = Record;
//# sourceMappingURL=record.js.map