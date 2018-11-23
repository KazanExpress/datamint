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
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    update(options, apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    read(apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
    delete(apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
            return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        });
    }
}
exports.RecordRepository = RecordRepository;
//# sourceMappingURL=record.js.map