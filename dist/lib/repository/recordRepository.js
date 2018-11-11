"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResult_1 = require("../queryResult");
const base_1 = require("./base");
class RecordRepository extends base_1.Repository {
    create(options) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data(options)));
    }
    update(options) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data(options)));
    }
    read() {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data({})));
    }
    delete() {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data({})));
    }
}
exports.RecordRepository = RecordRepository;
//# sourceMappingURL=recordRepository.js.map