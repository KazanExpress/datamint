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
var entity_1 = require("../repository/entity");
var base_1 = require("./base");
var defaultIdAliases = [
    'id', 'ID', 'Id', '_id', '_ID', '_Id', '__id', '__ID', '__Id', '__id__', '__ID__', '__Id__'
];
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(options) {
        var _this = _super.call(this, options) || this;
        // If no unique ID is set for the entity
        if (!_this.__idKey__) {
            var key = Object.keys(_this).find(function (key) { return defaultIdAliases.some(function (a) { return a === key; }); });
            // Auto-apply the ID decorator if found any compatible property
            if (key) {
                _this.constructor.ID(_this, key);
            }
        }
        if (_this.__idKey__ && options[String(_this.__idKey__)]) {
            Reflect.deleteProperty(_this, '__idValue__');
            Reflect.defineProperty(_this, '__idValue__', {
                value: options[String(_this.__idKey__)],
                writable: true,
                enumerable: false
            });
            Reflect.deleteProperty(_this, _this.__idKey__);
            Reflect.defineProperty(_this, _this.__idKey__, {
                get: function () { return _this.__idValue__; },
                set: function (v) { return _this.__idValue__ = v; },
                enumerable: true
            });
        }
        return _this;
    }
    Entity.ID = function (target, key) {
        target.__idKey__ = key;
        target.constructor.Property(target, key);
    };
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Entity.prototype, "__idKey__", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Object)
    ], Entity.prototype, "__idValue__", void 0);
    return Entity;
}(base_1.Storable));
exports.Entity = Entity;
/**
 * Enables ActiveRecord pattern for the entity
 */
var SaveableEntity = /** @class */ (function (_super) {
    __extends(SaveableEntity, _super);
    function SaveableEntity(options, repo) {
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
    SaveableEntity.prototype.__contextWarning = function (optional) {
        if (optional === void 0) { optional = ''; }
        this.__debug.$warn("Seems like the entity \"" + this.constructor.name + "\" was initialized in a wrong context.\n" + optional, true);
    };
    SaveableEntity.prototype.$save = function () {
        var _this = this;
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        var idkey = this.__idKey__;
        return this.__repo.updateById(idkey ? this[idkey] : 0, function () { return _this; }).then(function (r) { return r.result; }).catch(function (e) { throw e; });
    };
    SaveableEntity.prototype.$delete = function () {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        var idkey = this.__idKey__;
        return this.__repo.delete(idkey ? this[idkey] : 0).then(function (r) { return r.result; }).catch(function (e) { throw e; });
    };
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", debug_1.DebugInstance)
    ], SaveableEntity.prototype, "__debug", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", entity_1.EntityRepositoryClass)
    ], SaveableEntity.prototype, "__repo", void 0);
    __decorate([
        decorators_1.enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], SaveableEntity.prototype, "__contextWarning", null);
    return SaveableEntity;
}(Entity));
exports.SaveableEntity = SaveableEntity;
//# sourceMappingURL=entity.js.map