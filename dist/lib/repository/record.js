"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResult_1 = require("../queryResult");
const base_1 = require("./base");
/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
class RecordRepository extends base_1.Repository {
    create(options, apiOptions) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    update(options, apiOptions) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    read(apiOptions) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    delete(apiOptions) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
}
exports.RecordRepository = RecordRepository;
//# sourceMappingURL=record.js.map