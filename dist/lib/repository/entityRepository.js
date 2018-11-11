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
class EntityRepository extends base_1.Repository {
    constructor(name, connection, entity) {
        super(name, connection, entity);
        this.primaryKey = entity.prototype.__id__;
        this.columns = Object.keys(entity.prototype.__col__);
        delete entity.prototype.__col__;
    }
    add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this.Data(options);
            try {
                // Call local driver changes synchronously
                const queryResult = new queryResult_1.QueryResult(true, yield this.connection.currentDriver.create(this.name, instance));
                // Call api driver asynchronously
                if (apiOptions && this.connection.apiDriver) {
                    this.connection.apiDriver.create(this.name, apiOptions).then(res => {
                        queryResult.result = res;
                    }).catch(e => {
                        queryResult.error = e;
                    });
                }
                return queryResult;
            }
            catch (e) {
                // TODO: logs
                return new queryResult_1.QueryResult(false, instance, e);
            }
        });
    }
    get(id) {
        return new queryResult_1.QueryResult(true, new this.Data({}));
    }
    update(entity) {
        return new queryResult_1.QueryResult(true, new this.Data({}));
    }
    updateById(id, query) {
        return new queryResult_1.QueryResult(true, new this.Data(query({})));
    }
    delete(entity) {
        return new queryResult_1.QueryResult(true, new this.Data({}));
    }
    // TODO: Find, find by, etc...
    count() {
        // TODO: count entities
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entityRepository.js.map