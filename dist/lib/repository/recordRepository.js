"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResult_1 = require("../queryResult");
const base_1 = require("./base");
class RecordRepository extends base_1.Repository {
    create(options) {
        return new queryResult_1.QueryResult(true, new this.Data(options, this));
    }
    update(options) {
        return new queryResult_1.QueryResult(true, new this.Data(options, this));
    }
    read() {
        return new queryResult_1.QueryResult(true, new this.Data({}, this));
    }
    delete() {
        return new queryResult_1.QueryResult(true, new this.Data({}, this));
    }
}
exports.RecordRepository = RecordRepository;
//# sourceMappingURL=recordRepository.js.map