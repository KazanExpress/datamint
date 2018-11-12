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
const base_1 = require("../base");
/* TODO */
class ApiDriver extends base_1.Driver {
    constructor(connection, apiMap) {
        super(connection);
        this.apiMap = apiMap;
    }
    create(repositoryName, data) {
        const repo = this.apiMap[repositoryName];
        if (repo && repo.create) {
            return repo.create(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    }
    read(repositoryName, data) {
        const repo = this.apiMap[repositoryName];
        if (repo && repo.read) {
            return repo.read(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    }
    update(repositoryName, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = this.apiMap[repositoryName];
            if (!repo || !repo.update) {
                return Promise.reject( /* TODO: error handling */);
            }
            if (query) {
                const result = yield this.read(repositoryName, data);
                return repo.update(query(result));
            }
            return repo.update(data);
        });
    }
    delete(repositoryName, data) {
        const repo = this.apiMap[repositoryName];
        if (repo && repo.delete) {
            return repo.delete(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    }
    static get isSupported() { return true; }
}
exports.ApiDriver = ApiDriver;
//# sourceMappingURL=index.js.map