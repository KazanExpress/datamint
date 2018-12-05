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
var debug_1 = require("../debug");
var decorators_1 = require("../decorators");
var record_1 = require("../repository/record");
var base_1 = require("./base");
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record(options) {
        return _super.call(this, options) || this;
    }
    return Record;
}(base_1.Storable));
exports.Record = Record;
var SaveableRecord = /** @class */ (function (_super) {
    __extends(SaveableRecord, _super);
    function SaveableRecord(options, repo) {
        var _this = _super.call(this, options) || this;
        if (repo) {
            _this.__repo = repo;
            _this.__debug = new debug_1.DebugInstance("db:" + repo.name + ":entity", _this.__repo.$connectionName);
        }
        else {
            _this.__debug = new debug_1.DebugInstance('*', '');
            _this.__contextWarning();
        }
        return _this;
    }
    SaveableRecord.prototype.__contextWarning = function (optional) {
        if (optional === void 0) { optional = ''; }
        this.__debug.$warn("Seems like the record \"" + this.constructor.name + "\" was initialized in a wrong context.\n" + optional, true);
    };
    SaveableRecord.prototype.$save = function () {
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.update(this)
            .then(function (r) { return r.result; })
            .catch(function (e) { throw e; });
    };
    SaveableRecord.prototype.$delete = function () {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.delete()
            .then(function (r) { return r.result; })
            .catch(function (e) { throw e; });
    };
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", debug_1.DebugInstance)
    ], SaveableRecord.prototype, "__debug", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", record_1.RecordRepositoryClass)
    ], SaveableRecord.prototype, "__repo", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], SaveableRecord.prototype, "__contextWarning", null);
    return SaveableRecord;
}(Record));
exports.SaveableRecord = SaveableRecord;
//# sourceMappingURL=record.js.map