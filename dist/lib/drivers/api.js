"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
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
    read(repositoryName, id) {
        throw new Error('Method not implemented.');
    }
    update(repositoryName, id, query) {
        throw new Error('Method not implemented.');
        return Promise.resolve();
    }
    delete(repositoryName, id) {
        throw new Error('Method not implemented.');
    }
}
exports.ApiDriver = ApiDriver;
//# sourceMappingURL=api.js.map