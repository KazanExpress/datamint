"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var drivers_1 = require("../drivers");
var queryResult_1 = require("../queryResult");
var base_1 = require("./base");
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
var EntityRepositoryClass = /** @class */ (function (_super) {
    __extends(EntityRepositoryClass, _super);
    function EntityRepositoryClass(name, connectionName, currentDriver, entity, api) {
        var _this = _super.call(this, name, connectionName, entity, api) || this;
        _this.currentDriver = currentDriver;
        _this.columns = [];
        _this.primaryKey = entity.prototype.__idKey__;
        delete entity.prototype.__idKey__;
        if (entity.prototype.__col__) {
            _this.columns = entity.prototype.__col__;
            if (!_this.columns.includes(String(_this.primaryKey))) {
                _this.columns.push(String(_this.primaryKey));
            }
            delete entity.prototype.__col__;
        }
        else {
            // Cast to any to allow passing `this` as a second arg for classes implementing IActiveRecord to work
            // and to avoid pointless casting to Saveable
            _this.columns = Object.keys(new entity({}, _this));
        }
        return _this;
    }
    Object.defineProperty(EntityRepositoryClass.prototype, "driverOptions", {
        get: function () {
            return {
                name: this.name,
                columns: this.columns,
                primaryKey: this.primaryKey
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityRepositoryClass.prototype.add = function (options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions // Pass false to disable the api call
    ) {
        return __awaiter(this, void 0, void 0, function () {
            var result, instance, queryResult_2, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.currentDriver.create(this.driverOptions, options)];
                    case 1:
                        result = _a.sent();
                        instance = this.makeDataInstance(result);
                        queryResult_2 = new queryResult_1.QueryResult(true, instance);
                        // Call api driver asynchronously
                        if (this.api && this.api.add && apiOptions !== false) {
                            this.$log("API handler execution start: " + this.name + ".add()");
                            // @TODO: implement async request queue
                            this.api.add(options, apiOptions).then(function (res) {
                                queryResult_2.result = _this.makeDataInstance(res);
                                _this.$log("API handler execution end: " + _this.name + ".add() => " + JSON.stringify(res, undefined, '  '));
                            }).catch(function (e) {
                                queryResult_2.error = e;
                                _this.$error("API handler execution end: " + _this.name + ".add() => " + e);
                            });
                        }
                        else {
                            this.$log('No API handler called');
                        }
                        return [2 /*return*/, queryResult_2];
                    case 2:
                        e_1 = _a.sent();
                        this.$error(e_1);
                        return [2 /*return*/, new queryResult_1.QueryResult(false, this.makeDataInstance(options), e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EntityRepositoryClass.prototype.get = function (id, getApiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var result, instance, queryResult_3, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.currentDriver.findById(this.driverOptions, id)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("No results found for id " + id);
                        }
                        instance = this.makeDataInstance(result);
                        queryResult_3 = new queryResult_1.QueryResult(true, instance);
                        // Call api driver asynchronously
                        if (this.api && this.api.get && getApiOptions !== false) {
                            this.$log("API handler execution start: " + this.name + ".get()");
                            // @TODO: implement async request queue
                            this.api.get(id, getApiOptions).then(function (res) {
                                queryResult_3.result = _this.makeDataInstance(res);
                                _this.$log("API handler execution end: " + _this.name + ".get() => " + JSON.stringify(res, undefined, '  '));
                            }).catch(function (e) {
                                queryResult_3.error = e;
                                _this.$error("API handler execution end: " + _this.name + ".get() => " + e);
                            });
                        }
                        else {
                            this.$log('No API handler called');
                        }
                        return [2 /*return*/, queryResult_3];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, new queryResult_1.QueryResult(false, undefined, e_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EntityRepositoryClass.prototype.update = function (entity, updateApiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    /* Do we even need this?.. */
    EntityRepositoryClass.prototype.updateById = function (id, query, updateApiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    EntityRepositoryClass.prototype.delete = function (entity, deleteApiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    // TODO: Find, find by, exists, etc...
    EntityRepositoryClass.prototype.count = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return EntityRepositoryClass;
}(base_1.Repository));
exports.EntityRepositoryClass = EntityRepositoryClass;
function EntityRepository(options) {
    return function (name, connection) { return new EntityRepositoryClass(name, connection.name, new (base_1.selectDriver(options.dirvers || drivers_1.FallbackDriver, name))(connection), options.model, options.api); };
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entity.js.map