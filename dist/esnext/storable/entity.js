var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DebugInstance } from '../debug';
import { enumerable } from '../decorators';
import { Storable } from './base';
export class Entity extends Storable {
    constructor(options, ...args) {
        super(options, ...args);
        if (this.__idKey__ && options[String(this.__idKey__)]) {
            Reflect.deleteProperty(this, '__idValue__');
            Reflect.defineProperty(this, '__idValue__', {
                value: options[String(this.__idKey__)],
                writable: true,
                enumerable: false
            });
            Reflect.deleteProperty(this, this.__idKey__);
            Reflect.defineProperty(this, this.__idKey__, {
                get: () => this.__idValue__,
                set: v => this.__idValue__ = v,
                enumerable: true
            });
        }
    }
    static ID(target, key) {
        target.__idKey__ = key;
        target.constructor.Property(target, key);
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idKey__", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idValue__", void 0);
/**
 * Enables ActiveRecord pattern for the entity
 */
export class SaveableEntity extends Entity {
    constructor(options, repo) {
        super(options, repo);
        if (repo) {
            this.__repo = repo;
            this.__debug = new DebugInstance(`db:${repo.name}:entity`, this.__repo.connectionName);
        }
        else {
            this.__debug = new DebugInstance('*', '');
            this.__contextWarning();
        }
    }
    __contextWarning(optional = '') {
        this.__debug.$warn(`Seems like the entity "${this.constructor.name}" was initialized in a wrong context.\n${optional}`, true);
    }
    $save() {
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        const idkey = this.__idKey__;
        return this.__repo.updateById(idkey ? this[idkey] : 0, () => this).then((r) => r.result).catch(e => { throw e; });
    }
    $delete() {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        const idkey = this.__idKey__;
        return this.__repo.delete(idkey ? this[idkey] : 0).then((r) => r.result).catch(e => { throw e; });
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", DebugInstance)
], SaveableEntity.prototype, "__debug", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Object)
], SaveableEntity.prototype, "__repo", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaveableEntity.prototype, "__contextWarning", null);
//# sourceMappingURL=entity.js.map