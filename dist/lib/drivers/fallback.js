"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const isEntityRepo = (r) => !!r.columns;
/* TODO: driver that just writes everything to short-term memory */
class FallbackDriver extends base_1.Driver {
    constructor() {
        super(...arguments);
        this.repositoryMap = {};
    }
    create(repository, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isEntityRepo(repository)) {
                this.repositoryMap[repository.name] = {};
                this.repositoryMap[repository.name][data[repository.primaryKey]] = data;
            }
            else {
                this.repositoryMap[repository.name] = data;
            }
            return data;
        });
    }
    read(repository, id) {
        if (isEntityRepo(repository)) {
            return this.repositoryMap[repository.name][id];
        }
        return this.repositoryMap[repository.name];
    }
    update(repository, id, query) {
        throw new Error('Method not implemented.');
        return Promise.resolve();
    }
    delete(repository, entity) {
        const repo = this.repositoryMap[repository.name];
        let res;
        if (isEntityRepo(repository)) {
            const key = Object.keys(repo).findIndex(e => Object.keys(repo[e]).some(key => {
                return e[key] === entity[key];
            }));
            res = this.repositoryMap[repository.name][key];
            this.repositoryMap[repository.name][key] = undefined;
            delete this.repositoryMap[repository.name][key];
        }
        else {
            res = this.repositoryMap[repository.name];
            this.repositoryMap[repository.name] = undefined;
        }
        return res;
    }
}
exports.FallbackDriver = FallbackDriver;
//# sourceMappingURL=fallback.js.map