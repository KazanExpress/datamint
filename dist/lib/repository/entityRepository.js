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
        this.columns = [];
        this.primaryKey = entity.prototype.__id__;
        if (entity.prototype.__col__) {
            this.columns = Object.keys(entity.prototype.__col__);
            delete entity.prototype.__col__;
        }
        else {
            this.columns = Object.keys(entity.prototype);
        }
    }
    add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this.Data(options, this);
            try {
                // Call local driver changes synchronously
                const queryResult = new queryResult_1.QueryResult(true, yield this.connection.currentDriver.create(this.name, instance));
                // Call api driver asynchronously
                if (apiOptions && this.api) {
                    if (this.debugEnabled) {
                        this.log(`API handler execution start: ${this.name}.add()`);
                    }
                    this.api.create(this.name, apiOptions).then(res => {
                        queryResult.result = res;
                        this.log(`API handler execution end: ${this.name}.add()`);
                    }).catch(e => {
                        queryResult.error = e;
                        this.log(`API handler execution end: ${this.name}.add()`);
                    });
                }
                else if (this.debugEnabled) {
                    this.log('No API handler detected');
                }
                return queryResult;
            }
            catch (e) {
                this.error(e);
                return new queryResult_1.QueryResult(false, instance, e);
            }
        });
    }
    get(id) {
        return new queryResult_1.QueryResult(true, new this.Data({}, this));
    }
    update(entity) {
        return new queryResult_1.QueryResult(true, new this.Data({}, this));
    }
    updateById(id, query) {
        return new queryResult_1.QueryResult(true, new this.Data(query({}), this));
    }
    delete(entity) {
        return new queryResult_1.QueryResult(true, new this.Data({}, this));
    }
    // TODO: Find, find by, exists, etc...
    count() {
        // TODO: count entities
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entityRepository.js.map