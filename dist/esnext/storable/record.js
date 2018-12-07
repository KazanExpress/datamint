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
import { RecordRepositoryClass } from '../repository/record';
import { Storable } from './base';
export class Record extends Storable {
    constructor(options, ...args) { super(options, ...args); }
}
export class SaveableRecord extends Record {
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
        this.__debug.$warn(`Seems like the record "${this.constructor.name}" was initialized in a wrong context.\n${optional}`, true);
    }
    $save() {
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.update(this)
            .then(r => r.result)
            .catch(e => { throw e; });
    }
    $delete() {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.delete()
            .then(r => r.result)
            .catch(e => { throw e; });
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", DebugInstance)
], SaveableRecord.prototype, "__debug", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", RecordRepositoryClass)
], SaveableRecord.prototype, "__repo", void 0);
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaveableRecord.prototype, "__contextWarning", null);
//# sourceMappingURL=record.js.map