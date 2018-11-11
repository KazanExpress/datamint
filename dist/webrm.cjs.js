'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var LOG_PREFIX = function (name) { return name ? "[WebRM:" + name + "]" : "[WebRM]"; };
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Object.defineProperty(Debug, "isEnabled", {
        /**
         * `true` if any debug is enabled
         */
        get: function () { return this.debugState !== 'disabled'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Debug, "state", {
        /**
         * Shows the current debug state of WebRM
         *
         * - `enabled` - all the logs and exceptions are enabled
         * - `custom` - custom rules are set via a `debug()` function
         * - `disabled` - all the logs and most exceptions are suppressed
         */
        get: function () { return this.debugState; },
        set: function (v) { this.debugState = v; },
        enumerable: true,
        configurable: true
    });
    Debug.error = function (instanceName, type, message) {
        return this.print(instanceName, type, message, 'error');
    };
    Debug.log = function (instanceName, type, message) {
        return this.print(instanceName, type, message, 'log');
    };
    Debug.warn = function (instanceName, type, message) {
        return this.print(instanceName, type, message, 'warn');
    };
    Debug.errorType = function (type) {
        var _this = this;
        if (this.map['*']) {
            return this.map['*'];
        }
        var isString = function (t) { return typeof t === 'string'; };
        if (isString(type) && this.map[type]) {
            return this.map[type];
        }
        if (isString(type)) {
            var matchingType = Object.keys(this.map)
                .find(function (t) { return !!t && t.includes(type) && !!_this.map[t]; });
            return matchingType || false;
        }
        return Object.keys(this.map).find(function (t) { return type.test(t); }) || false;
    };
    Debug.print = function (instanceName, type, message, level) {
        if (this.debugState !== 'disabled') {
            var typeOfError = this.errorType(type);
            if (typeOfError) {
                if (typeOfError === 'hard' && level === 'error') {
                    throw new Error(LOG_PREFIX(instanceName) + ":" + type + " - " + message);
                }
                else {
                    console[level]("%c" + LOG_PREFIX(instanceName) + "%c:%c" + type + "%c - " + message, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
                }
            }
        }
    };
    Debug.prints = function (message, level, type) {
        var _this = this;
        if (level === void 0) { level = 'log'; }
        if (type === void 0) { type = '*'; }
        return function (target, key, desc) {
            Object.defineProperty(_this.decoratedLogs, key, desc || {
                value: undefined,
                writable: true,
                enumerable: true
            });
            Object.defineProperty(target, key, {
                get: function () {
                    _this.print('', type, message, level);
                    return _this.decoratedLogs[key];
                },
                set: function (v) {
                    _this.decoratedLogs[key] = v;
                }
            });
        };
    };
    Debug.debugState = 'disabled';
    /**
     * Contains the map for all debug types and their respective error types for the ORM.
     */
    Debug.map = {};
    Debug.decoratedLogs = {};
    return Debug;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var Driver = /** @class */ (function () {
    function Driver(connection) {
        this.connection = connection;
    }
    Object.defineProperty(Driver, "isSupported", {
        /**
         * Determines if the driver is supported in current environment
         */
        get: function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return Driver;
}());

var FallbackDriver = /** @class */ (function (_super) {
    __extends(FallbackDriver, _super);
    function FallbackDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FallbackDriver.prototype.create = function (repositoryName, entity) {
        throw new Error('Method not implemented.');
    };
    FallbackDriver.prototype.read = function (repositoryName, id) {
        throw new Error('Method not implemented.');
    };
    FallbackDriver.prototype.update = function (repositoryName, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    FallbackDriver.prototype.delete = function (repositoryName, entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    return FallbackDriver;
}(Driver));

/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */
var Repository = /** @class */ (function () {
    function Repository(name, connection, Data) {
        this.name = name;
        this.connection = connection;
        this.Data = Data;
        if (
        // If this class was instantiated directly (without inheritance)
        Repository.prototype === this.constructor.prototype
            // And debug for db:[name] is set
            && Debug.map["db:" + name]) {
            Debug.warn(connection.name, "db:" + name, "Using default empty repository for " + name);
        }
    }
    return Repository;
}());

/**
 * Incapsulates the query result data for further manipulation
 *
 * @template T the type of data encapsulated
 */
var QueryResult = /** @class */ (function () {
    function QueryResult(ok, result, error) {
        this.handlers = [];
        this._ok = ok;
        this._result = result;
        this._error = error;
    }
    Object.defineProperty(QueryResult.prototype, "ok", {
        /**
         * Determines whether the incapsulated data is OK and contains no errors
         */
        get: function () { return this._ok; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryResult.prototype, "result", {
        /**
         * The resulting data of the query request
         */
        get: function () { return this._result; },
        set: function (value) {
            var _this = this;
            this._ok = true;
            this._result = value;
            this.handlers.forEach(function (h) { return h(_this.error, _this.result); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryResult.prototype, "error", {
        /**
         * The error of the query (if any)
         */
        get: function () { return this._error; },
        set: function (value) {
            var _this = this;
            this._ok = false;
            this._error = value;
            this.handlers.forEach(function (h) { return h(_this.error, _this.result); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fires a handler whenever the data in the result has been changed
     *
     * @param callback the callback to fire
     */
    QueryResult.prototype.onChange = function (callback) {
        this.handlers.push(callback);
    };
    /**
     * Unsubscribe the callback from the result data changes
     */
    QueryResult.prototype.offChange = function (callback) {
        var idx = this.handlers.indexOf(callback);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    };
    return QueryResult;
}());

var EntityRepository = /** @class */ (function (_super) {
    __extends(EntityRepository, _super);
    function EntityRepository(name, connection, entity) {
        var _this = _super.call(this, name, connection, entity) || this;
        _this.columns = [];
        _this.primaryKey = entity.prototype.__id__;
        if (entity.prototype.__col__) {
            _this.columns = Object.keys(entity.prototype.__col__);
            delete entity.prototype.__col__;
        }
        else {
            _this.columns = Object.keys(entity.prototype);
        }
        return _this;
    }
    EntityRepository.prototype.add = function (options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, queryResult_1, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        instance = new this.Data(options);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = QueryResult.bind;
                        _b = [void 0, true];
                        return [4 /*yield*/, this.connection.currentDriver.create(this.name, instance)];
                    case 2:
                        queryResult_1 = new (_a.apply(QueryResult, _b.concat([_c.sent()])))();
                        // Call api driver asynchronously
                        if (apiOptions && this.connection.apiDriver) {
                            this.connection.apiDriver.create(this.name, apiOptions).then(function (res) {
                                queryResult_1.result = res;
                            }).catch(function (e) {
                                queryResult_1.error = e;
                            });
                        }
                        return [2 /*return*/, queryResult_1];
                    case 3:
                        e_1 = _c.sent();
                        // TODO: logs
                        return [2 /*return*/, new QueryResult(false, instance, e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EntityRepository.prototype.get = function (id) {
        return new QueryResult(true, new this.Data({}));
    };
    EntityRepository.prototype.update = function (entity) {
        return new QueryResult(true, new this.Data({}));
    };
    EntityRepository.prototype.updateById = function (id, query) {
        return new QueryResult(true, new this.Data(query({})));
    };
    EntityRepository.prototype.delete = function (entity) {
        return new QueryResult(true, new this.Data({}));
    };
    // TODO: Find, find by, etc...
    EntityRepository.prototype.count = function () {
        // TODO: count entities
    };
    return EntityRepository;
}(Repository));

function NonEnumerable(target, key, desc) {
    if (desc === void 0) { desc = {}; }
    Object.defineProperty(target, key, __assign({}, desc, { 
        // TODO: check to be writable
        enumerable: false }));
}

var Entity = /** @class */ (function () {
    function Entity(options) {
        // TODO: check to be writable
        this.__col__ = [];
        if (this.__idCol__) {
            this.__idValue__ = options[this.__idCol__];
        }
    }
    Entity.prototype.$save = function () {
        return Promise.resolve();
    };
    Entity.prototype.$delete = function () {
        return Promise.resolve();
    };
    Entity.Column = function (target, key) {
        target.__col__.push(key);
    };
    Entity.ID = function (target, key) {
        target.__idCol__ = key;
    };
    __decorate([
        NonEnumerable,
        __metadata("design:type", Array)
    ], Entity.prototype, "__col__", void 0);
    __decorate([
        NonEnumerable,
        __metadata("design:type", Object)
    ], Entity.prototype, "__idCol__", void 0);
    __decorate([
        NonEnumerable,
        __metadata("design:type", Object)
    ], Entity.prototype, "__idValue__", void 0);
    return Entity;
}());
var Column = Entity.Column;
var ID = Entity.ID;

var Record = /** @class */ (function () {
    function Record() {
    }
    Record.prototype.$save = function () {
        throw new Error('Method not implemented.');
    };
    Record.prototype.$delete = function () {
        throw new Error('Method not implemented.');
    };
    return Record;
}());

var RecordRepository = /** @class */ (function (_super) {
    __extends(RecordRepository, _super);
    function RecordRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecordRepository.prototype.create = function (options) {
        return new QueryResult(true, new this.Data(options));
    };
    RecordRepository.prototype.update = function (options) {
        return new QueryResult(true, new this.Data(options));
    };
    RecordRepository.prototype.read = function () {
        return new QueryResult(true, new this.Data({}));
    };
    RecordRepository.prototype.delete = function () {
        return new QueryResult(true, new this.Data({}));
    };
    return RecordRepository;
}(Repository));

function makeRepository(name, connection, data) {
    var Constructor;
    if (data.prototype instanceof Entity) {
        Constructor = EntityRepository;
    }
    else if (data.prototype instanceof Record) {
        Constructor = RecordRepository;
    }
    else {
        Debug.error(connection.name, 'db', "No suitable repository found for " + data.name + " when trying to connect with " + name + ".");
        Constructor = Repository;
    }
    return new Constructor(name, connection, data);
}

/* TODO */
var ApiDriver = /** @class */ (function (_super) {
    __extends(ApiDriver, _super);
    function ApiDriver(connection, apiMap) {
        var _this = _super.call(this, connection) || this;
        _this.apiMap = apiMap;
        return _this;
    }
    ApiDriver.prototype.create = function (repositoryName, data) {
        var repo = this.apiMap[repositoryName];
        if (repo && repo.create) {
            return repo.create(data);
        }
        else {
            return Promise.reject( /* TODO: error handling */);
        }
    };
    ApiDriver.prototype.read = function (repositoryName, id) {
        throw new Error('Method not implemented.');
    };
    ApiDriver.prototype.update = function (repositoryName, id, query) {
        throw new Error('Method not implemented.');
        return Promise.resolve();
    };
    ApiDriver.prototype.delete = function (repositoryName, id) {
        throw new Error('Method not implemented.');
    };
    return ApiDriver;
}(Driver));

var Connection = /** @class */ (function () {
    /**
     * Creates a WebRM connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current data structure
     */
    function Connection(name, drivers, repositories, apiMap) {
        var _this = this;
        this.name = name;
        this.drivers = drivers;
        this.apiMap = apiMap;
        /**
         * A current map of bound repositories
         */
        this.repositories = {};
        if (apiMap) {
            this.apiDriver = new ApiDriver(this, apiMap);
        }
        else {
            Debug.log(this.name, '*', 'The main webrm functionality is disabled. Are you sure you want to use this without API?');
        }
        // Select the first supported driver from the bunch
        var SupportedDriver = drivers.find(function (d) { return d.isSupported; });
        if (SupportedDriver) {
            // TODO: multi-driver mode
            Debug.log(this.name, 'orm', "Using driver \"" + SupportedDriver.name + "\" as the first supported driver");
            this.currentDriver = new SupportedDriver(this);
        }
        else {
            Debug.warn(this.name, 'orm', 'No supported driver provided. Using fallback.');
            this.currentDriver = new FallbackDriver(this);
        }
        var reProxy;
        if (!Proxy) {
            Debug.warn(this.name, 'orm', "window.Proxy is unavailable. Using insufficient property forwarding.");
            reProxy = function (repoName) { return Object.defineProperty(_this, repoName, {
                get: function () { return _this.repositories[repoName]; },
            }); };
        }
        for (var repoName in repositories) {
            var entityConstructor = repositories[repoName];
            this.repositories[repoName] = makeRepository(repoName, {
                name: this.name,
                apiDriver: this.apiDriver,
                currentDriver: this.currentDriver
            }, entityConstructor);
            reProxy && reProxy(repoName);
        }
        if (Proxy) {
            Debug.log(this.name, 'orm', "window.Proxy is available. Using modern property forwarding.");
            return new Proxy(this, {
                get: function (target, key) {
                    if (!target.repositories[key]) {
                        if (!target[key]) {
                            Debug.log(target.name, 'orm', "Repository \"" + key + "\" is not registered upon initialization. No other property with the same name was found.");
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
    }
    Connection.debug = function (type, exceptions) {
        if (typeof type === 'boolean') {
            Debug.state = (type ? 'enabled' : 'disabled');
        }
        else {
            Debug.state = ('custom');
            Debug.map[type] = exceptions || !Debug.map[type];
        }
    };
    return Connection;
}());

var Connection$1 = Connection;

exports.Connection = Connection$1;
exports.Entity = Entity;
exports.Column = Column;
exports.ID = ID;
exports.Record = Record;
//# sourceMappingURL=webrm.cjs.js.map
