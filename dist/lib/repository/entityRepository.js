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
 * A typical multi-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 * @template `ID` entity primary key type
 * @template `IDKey` entity primary key name
 */
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
            this.columns = Object.keys(new entity({}, this));
        }
    }
    add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.currentDriver.create(this.name, options);
            try {
                const instance = this.makeDataInstance(result);
                // Call local driver changes synchronously
                const queryResult = new queryResult_1.QueryResult(true, instance);
                // Call api driver asynchronously
                if (apiOptions && this.api) {
                    this.$log(`API handler execution start: ${this.name}.add()`);
                    this.api.create(this.name, apiOptions).then(res => {
                        queryResult.result = this.makeDataInstance(result);
                        this.$log(`API handler execution end: ${this.name}.add()`);
                    }).catch(e => {
                        queryResult.error = e;
                        this.$log(`API handler execution end: ${this.name}.add()`);
                    });
                }
                else {
                    this.$log('No API handler detected');
                }
                return queryResult;
            }
            catch (e) {
                this.$error(e);
                return new queryResult_1.QueryResult(false, this.makeDataInstance(options), e);
            }
        });
    }
    get(id) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    update(entity) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    updateById(id, query) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
    }
    delete(entity) {
        throw new Error('Not implemented');
        return new queryResult_1.QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    // TODO: Find, find by, exists, etc...
    count() {
        // TODO: count entities
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entityRepository.js.map