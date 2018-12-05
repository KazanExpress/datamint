'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var enumerable = function (isEnumerable) {
    if (isEnumerable === void 0) { isEnumerable = true; }
    return function (target, key, desc) {
        var descriptor = Object.getOwnPropertyDescriptor(target, key) || desc || {};
        if (descriptor.enumerable != isEnumerable) {
            descriptor.enumerable = !!isEnumerable;
            if (descriptor.get || descriptor.set) {
                descriptor.configurable = descriptor.configurable === undefined ? true : descriptor.configurable;
            }
            else {
                descriptor.writable = descriptor.writable === undefined ? true : descriptor.writable;
            }
            Reflect.deleteProperty(target, key);
            Object.defineProperty(target, key, descriptor);
        }
    };
};

var LOG_PREFIX = function (name) { return name ? "[webalorm:" + name + "]" : "[webalorm]"; };
/**
 * Shows the current debug state of WEBALORM
 *
 * - `enabled` - all the logs and exceptions are enabled
 * - `custom` - custom rules are set via a `debug()` function
 * - `disabled` - all the logs and most exceptions are suppressed
 */
var debugState = 'disabled';
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
var debugMap = {};
function setDebugState(state) {
    debugState = state;
}
function errorTypeFor(type) {
    if (debugMap['*']) {
        return debugMap['*'];
    }
    var isString = function (t) { return typeof t === 'string'; };
    if (isString(type) && debugMap[type]) {
        return debugMap[type];
    }
    if (isString(type)) {
        var matchingType = Object.keys(debugMap)
            .find(function (t) { return !!t && t.includes(type) && !!debugMap[t]; });
        return matchingType || false;
    }
    return Object.keys(debugMap).find(function (t) { return type.test(t); }) || false;
}
function print(instanceName, type, message, level, force) {
    if (force === void 0) { force = false; }
    if ((debugState !== 'disabled') || force) {
        var errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                throw new Error(LOG_PREFIX(instanceName) + ":" + type + " - " + message);
            }
            else {
                if (typeof window !== 'undefined') {
                    window.console[level]("%c" + LOG_PREFIX(instanceName) + "%c:%c" + type + "%c - " + message, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
                }
                else {
                    console[level](LOG_PREFIX(instanceName) + ":" + type + " - " + message);
                }
            }
        }
    }
}

var Debugable = /** @class */ (function () {
    function Debugable() {
        this.$log = this.$logFactory('log');
        this.$warn = this.$logFactory('warn');
        this.$error = this.$logFactory('error');
        this.$debug = this.$logFactory('debug');
    }
    Object.defineProperty(Debugable.prototype, "$debugEnabled", {
        /**
         * `true` if the debug is enabled for this class
         */
        get: function () { return errorTypeFor(this.$debugType); },
        enumerable: true,
        configurable: true
    });
    Debugable.prototype.$logFactory = function (level) {
        var _this = this;
        return function (message, force) {
            if (force === void 0) { force = false; }
            return print(_this.$connectionName, _this.$debugType, message, level, force);
        };
    };
    __decorate([
        enumerable(false),
        __metadata("design:type", String)
    ], Debugable.prototype, "$debugType", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", String)
    ], Debugable.prototype, "$connectionName", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Debugable.prototype, "$debugEnabled", null);
    __decorate([
        enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Debugable.prototype, "$logFactory", null);
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$log", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$warn", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$error", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Debugable.prototype, "$debug", void 0);
    return Debugable;
}());
var DebugInstance = /** @class */ (function (_super) {
    __extends(DebugInstance, _super);
    function DebugInstance($debugType, $connectionName) {
        var _this = _super.call(this) || this;
        _this.$debugType = $debugType;
        _this.$connectionName = $connectionName;
        return _this;
    }
    return DebugInstance;
}(Debugable));

var GlobalDebug = /** @class */ (function (_super) {
    __extends(GlobalDebug, _super);
    function GlobalDebug() {
        var _this = _super.call(this) || this;
        _this.$debugType = '*';
        _this.$connectionName = '';
        return _this;
    }
    Object.defineProperty(GlobalDebug.prototype, "map", {
        get: function () {
            return debugMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalDebug.prototype, "state", {
        get: function () {
            return debugState;
        },
        enumerable: true,
        configurable: true
    });
    GlobalDebug.instance = new GlobalDebug();
    return GlobalDebug;
}(Debugable));
var Debug = GlobalDebug.instance;

var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    /**
     * Creates a connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param repositories sets the relation of a repository name to its contents' options.
     */
    function Connection(name, repositories) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.$debugType = "connection";
        _this.$connectionName = _this.name;
        /**
         * A current map of bound repositories
         */
        _this.repositories = {};
        var reProxy;
        if (!Proxy) {
            _this.$warn("Proxy is unavailable. Using insufficient property forwarding.");
            reProxy = function (repoName) { return Object.defineProperty(_this, repoName, {
                get: function () { return _this.repositories[repoName]; },
            }); };
        }
        for (var repoName in repositories) {
            _this.repositories[repoName] = repositories[repoName](repoName, _this);
            reProxy && reProxy(repoName);
        }
        // Make repositories immutable
        _this.repositories = Object.freeze(_this.repositories);
        if (Proxy) {
            _this.$log("Proxy is available. Using modern property forwarding.");
            return new Proxy(_this, {
                get: function (target, key) {
                    if (!target.repositories[key]) {
                        if (typeof target[key] === 'undefined') {
                            target.$warn("Repository \"" + key + "\" is not registered upon initialization. No other property with the same name was found.");
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
        return _this;
    }
    Connection.$debug = function (type, exceptions) {
        if (typeof type === 'undefined') {
            return debugState;
        }
        if (typeof type === 'boolean') {
            setDebugState(type ? 'enabled' : 'disabled');
            debugMap['*'] = exceptions || type;
        }
        else {
            setDebugState('custom');
            debugMap[type] = exceptions || !debugMap[type];
        }
        return;
    };
    return Connection;
}(Debugable));

var Connection$1 = Connection;

var Driver = /** @class */ (function (_super) {
    __extends(Driver, _super);
    function Driver(connection) {
        var _this = _super.call(this) || this;
        _this.connection = connection;
        _this.$debugType = 'driver';
        _this.$connectionName = _this.connection.name;
        return _this;
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
}(Debugable));

/**
 * @todo refactor, code is a mess
 */
var FallbackDriver = /** @class */ (function (_super) {
    __extends(FallbackDriver, _super);
    function FallbackDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.repositoryMap = {};
        return _this;
    }
    FallbackDriver.prototype.create = function (_a, data) {
        var primaryKey = _a.primaryKey, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var repo, key;
            return __generator(this, function (_b) {
                if (!this.repositoryMap[name]) {
                    if ({ primaryKey: primaryKey, name: name }.primaryKey) {
                        this.repositoryMap[name] = {};
                    }
                    else {
                        this.repositoryMap[name] = [];
                    }
                }
                repo = this.repositoryMap[name];
                if (primaryKey) {
                    key = String(data[primaryKey]);
                    repo[key] = data;
                }
                else if (Array.isArray(repo)) {
                    repo.push(data);
                }
                return [2 /*return*/, data];
            });
        });
    };
    FallbackDriver.prototype.findById = function (_a, id) {
        var primaryKey = _a.primaryKey, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var repo, result;
            return __generator(this, function (_b) {
                repo = this.repositoryMap[name];
                if (primaryKey) {
                    if (Array.isArray(repo)) {
                        return [2 /*return*/, repo.find(function (i) { return i[primaryKey] === id; })];
                    }
                    else {
                        if (primaryKey) {
                            result = repo[String(id)];
                            if (!result) {
                                result = Object.values(repo).find(function (i) { return i[primaryKey] === id; });
                            }
                            return [2 /*return*/, result];
                        }
                        else if (id) {
                            return [2 /*return*/, repo[String(id)]];
                        }
                    }
                }
                else if (Array.isArray(repo)) {
                    return [2 /*return*/, repo[id]];
                }
                return [2 /*return*/, Object.values(repo)[0]];
            });
        });
    };
    FallbackDriver.prototype.update = function (_a, data) {
        var name = _a.name, primaryKey = _a.primaryKey;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                throw new Error('Method not implemented.');
            });
        });
    };
    FallbackDriver.prototype.updateOne = function (_a, id, query) {
        var name = _a.name, primaryKey = _a.primaryKey;
        return __awaiter(this, void 0, void 0, function () {
            var repo, res, mixInQuery, idx;
            return __generator(this, function (_b) {
                repo = this.repositoryMap[name];
                res = undefined;
                mixInQuery = function (obj) { return typeof query === 'function' ? __assign({}, obj, query(obj)) : __assign({}, obj, query); };
                if (primaryKey) {
                    if (Array.isArray(repo)) {
                        idx = repo.findIndex(function (i) { return i[primaryKey] === id; });
                        if (idx === -1) {
                            this.$error("No entity by id " + String(id) + " was found");
                            return [2 /*return*/, res];
                        }
                        repo[idx] = res = mixInQuery(repo[idx]);
                    }
                    else {
                        repo[id] = res = mixInQuery(repo[id]);
                    }
                }
                else if (Array.isArray(repo) && typeof id === 'number') {
                    repo[id] = res = mixInQuery(repo[id]);
                }
                else {
                    this.$error("Id " + String(id) + " is of the wrong type " + typeof id);
                }
                return [2 /*return*/, res];
            });
        });
    };
    FallbackDriver.prototype.deleteOne = function (_a, id) {
        var name = _a.name, primaryKey = _a.primaryKey;
        return __awaiter(this, void 0, void 0, function () {
            var repo, res, idx;
            return __generator(this, function (_b) {
                repo = this.repositoryMap[name];
                if (primaryKey) {
                    if (Array.isArray(repo)) {
                        idx = repo.findIndex(function (i) { return i[primaryKey] === id; });
                        res = repo[idx];
                        repo.splice(idx, 1);
                    }
                    else {
                        res = repo[id];
                        repo[id] = undefined;
                        delete repo[id];
                    }
                }
                else if (Array.isArray(repo) && typeof id === 'number') {
                    res = repo[id];
                    repo.splice(id, 1);
                }
                else {
                    throw new Error("Id " + String(id) + " is of the wrong type " + typeof id);
                }
                return [2 /*return*/, res];
            });
        });
    };
    FallbackDriver.prototype.delete = function (_a, entity) {
        var name = _a.name, primaryKey = _a.primaryKey;
        return __awaiter(this, void 0, void 0, function () {
            var repo, res;
            return __generator(this, function (_b) {
                repo = this.repositoryMap[name];
                // if (isEntityRepo(repository)) {
                //   const key = Object.keys(repo).findIndex(e => Object.keys(repo[e]).some(key => {
                //     return e[key] === entity[key];
                //   }));
                //   res = this.repositoryMap[repository.name][key];
                //   this.repositoryMap[repository.name][key] = undefined;
                //   delete this.repositoryMap[repository.name][key];
                // } else {
                //   res = this.repositoryMap[repository.name];
                //   this.repositoryMap[repository.name] = undefined;
                // }
                return [2 /*return*/, res];
            });
        });
    };
    return FallbackDriver;
}(Driver));

var MultiDriver = /** @class */ (function (_super) {
    __extends(MultiDriver, _super);
    function MultiDriver(connection, drivers) {
        var _this = _super.call(this, connection) || this;
        _this.create = _this.request('create');
        _this.findById = _this.request('findById');
        _this.update = _this.request('update');
        _this.updateOne = _this.request('updateOne');
        _this.deleteOne = _this.request('deleteOne');
        _this.delete = _this.request('delete');
        _this.drivers = drivers.filter(function (d) { return d.isSupported; }).map(function (D) { return new D(connection); });
        return _this;
    }
    MultiDriver.prototype.request = function (type) {
        return function () {
            var args = arguments;
            var allResponses = Promise.all(this.drivers.map(function (d) { return d[type].apply(d, args); }));
            return allResponses[0];
        }.bind(this);
    };
    Object.defineProperty(MultiDriver, "isSupported", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    return MultiDriver;
}(Driver));

var Repository = /** @class */ (function (_super) {
    __extends(Repository, _super);
    function Repository(name, $connectionName, Data, api) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.$connectionName = $connectionName;
        _this.Data = Data;
        _this.api = api;
        _this.$debugType = "db:" + _this.name.toLowerCase();
        if (!api) {
            _this.$warn('The main functionality is disabled. Are you sure you want to use this without API?', true);
        }
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === _this.constructor.prototype) {
            if (_this.$debugEnabled) {
                _this.$error("Using default empty repository.");
            }
            else {
                Debug.$error("Using default empty repository for " + name, true);
            }
        }
        return _this;
    }
    Repository.prototype.makeDataInstance = function (options) {
        // Cast to any to allow passing `this` as a second arg for classes implementing IActiveRecord to work
        return new this.Data(options, this);
    };
    return Repository;
}(Debugable));
function selectDriver(drivers, repoName) {
    var error = function () {
        var msg = "No supported driver provided for " + repoName + ".";
        if (Debug.map['*'] !== 'hard') {
            msg += ' Using fallback.';
        }
        Debug.$error(msg);
    };
    if (Array.isArray(drivers)) {
        // Select the first supported driver from the bunch
        var SupportedDrivers = drivers.filter(function (d) { return d.isSupported; });
        if (SupportedDrivers.length > 0) {
            return SupportedDrivers[0];
        }
        else {
            return error(), FallbackDriver;
        }
    }
    else if (drivers instanceof MultiDriver) {
        return drivers;
    }
    else {
        return error(), FallbackDriver;
    }
}

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
            var result, instance, queryResult_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.currentDriver.create(this.driverOptions, options)];
                    case 1:
                        result = _a.sent();
                        instance = this.makeDataInstance(result);
                        queryResult_1 = new QueryResult(true, instance);
                        // Call api driver asynchronously
                        if (this.api && this.api.add && apiOptions !== false) {
                            this.$log("API handler execution start: " + this.name + ".add()");
                            // @TODO: implement async request queue
                            this.api.add(options, apiOptions).then(function (res) {
                                queryResult_1.result = _this.makeDataInstance(res);
                                _this.$log("API handler execution end: " + _this.name + ".add() => " + JSON.stringify(res, undefined, '  '));
                            }).catch(function (e) {
                                queryResult_1.error = e;
                                _this.$error("API handler execution end: " + _this.name + ".add() => " + e);
                            });
                        }
                        else {
                            this.$log('No API handler called');
                        }
                        return [2 /*return*/, queryResult_1];
                    case 2:
                        e_1 = _a.sent();
                        this.$error(e_1);
                        return [2 /*return*/, new QueryResult(false, this.makeDataInstance(options), e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EntityRepositoryClass.prototype.get = function (id, getApiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var result, instance, queryResult_2, e_2;
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
                        queryResult_2 = new QueryResult(true, instance);
                        // Call api driver asynchronously
                        if (this.api && this.api.get && getApiOptions !== false) {
                            this.$log("API handler execution start: " + this.name + ".get()");
                            // @TODO: implement async request queue
                            this.api.get(id, getApiOptions).then(function (res) {
                                queryResult_2.result = _this.makeDataInstance(res);
                                _this.$log("API handler execution end: " + _this.name + ".get() => " + JSON.stringify(res, undefined, '  '));
                            }).catch(function (e) {
                                queryResult_2.error = e;
                                _this.$error("API handler execution end: " + _this.name + ".get() => " + e);
                            });
                        }
                        else {
                            this.$log('No API handler called');
                        }
                        return [2 /*return*/, queryResult_2];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, new QueryResult(false, undefined, e_2)];
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
}(Repository));
function EntityRepository(options) {
    return function (name, connection) { return new EntityRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api); };
}

/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
var RecordRepositoryClass = /** @class */ (function (_super) {
    __extends(RecordRepositoryClass, _super);
    function RecordRepositoryClass(name, connectionName, currentDriver, record, api) {
        var _this = _super.call(this, name, connectionName, record, api) || this;
        _this.currentDriver = currentDriver;
        return _this;
    }
    RecordRepositoryClass.prototype.create = function (options, apiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    RecordRepositoryClass.prototype.update = function (options, apiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    RecordRepositoryClass.prototype.read = function (apiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    RecordRepositoryClass.prototype.delete = function (apiOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    };
    return RecordRepositoryClass;
}(Repository));
function RecordRepository(options) {
    return function (name, connection) { return new RecordRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api); };
}

var RemoteRepositoryClass = /** @class */ (function (_super) {
    __extends(RemoteRepositoryClass, _super);
    function RemoteRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RemoteRepositoryClass.prototype, "API", {
        get: function () {
            return this.api;
        },
        enumerable: true,
        configurable: true
    });
    return RemoteRepositoryClass;
}(Repository));
function RemoteRepository(options) {
    return function (name, connection) { return new RemoteRepositoryClass(name, connection.name, options.model, options.api); };
}

var Storable = /** @class */ (function () {
    function Storable(__options) {
        this.__options = __options;
    }
    Storable.Property = function (target, key) {
        var constructor = target.constructor;
        if (!constructor.__col__) {
            constructor.__col__ = [];
        }
        constructor.__col__.push(key);
    };
    Storable.__col__ = [];
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Storable.prototype, "__options", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Array)
    ], Storable, "__col__", void 0);
    return Storable;
}());

var defaultIdAliases = [
    'id', 'ID', 'Id', '_id', '_ID', '_Id', '__id', '__ID', '__Id', '__id__', '__ID__', '__Id__'
];
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(options) {
        var _this = _super.call(this, options) || this;
        // If no unique ID is set for the entity
        if (!_this.__idKey__) {
            var key = Object.keys(_this).find(function (key) { return defaultIdAliases.some(function (a) { return a === key; }); });
            // Auto-apply the ID decorator if found any compatible property
            if (key) {
                _this.constructor.ID(_this, key);
            }
        }
        if (_this.__idKey__ && options[String(_this.__idKey__)]) {
            Reflect.deleteProperty(_this, '__idValue__');
            Reflect.defineProperty(_this, '__idValue__', {
                value: options[String(_this.__idKey__)],
                writable: true,
                enumerable: false
            });
            Reflect.deleteProperty(_this, _this.__idKey__);
            Reflect.defineProperty(_this, _this.__idKey__, {
                get: function () { return _this.__idValue__; },
                set: function (v) { return _this.__idValue__ = v; },
                enumerable: true
            });
        }
        return _this;
    }
    Entity.ID = function (target, key) {
        target.__idKey__ = key;
        target.constructor.Property(target, key);
    };
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Entity.prototype, "__idKey__", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Object)
    ], Entity.prototype, "__idValue__", void 0);
    return Entity;
}(Storable));
/**
 * Enables ActiveRecord pattern for the entity
 */
var SaveableEntity = /** @class */ (function (_super) {
    __extends(SaveableEntity, _super);
    function SaveableEntity(options, repo) {
        var _this = _super.call(this, options) || this;
        if (repo) {
            _this.__repo = repo;
            _this.__debug = new DebugInstance("db:" + repo.name + ":entity", _this.__repo.$connectionName);
        }
        else {
            _this.__debug = new DebugInstance('*', '');
            _this.__contextWarning();
        }
        return _this;
    }
    SaveableEntity.prototype.__contextWarning = function (optional) {
        if (optional === void 0) { optional = ''; }
        this.__debug.$warn("Seems like the entity \"" + this.constructor.name + "\" was initialized in a wrong context.\n" + optional, true);
    };
    SaveableEntity.prototype.$save = function () {
        var _this = this;
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        var idkey = this.__idKey__;
        return this.__repo.updateById(idkey ? this[idkey] : 0, function () { return _this; }).then(function (r) { return r.result; }).catch(function (e) { throw e; });
    };
    SaveableEntity.prototype.$delete = function () {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        var idkey = this.__idKey__;
        return this.__repo.delete(idkey ? this[idkey] : 0).then(function (r) { return r.result; }).catch(function (e) { throw e; });
    };
    __decorate([
        enumerable(false),
        __metadata("design:type", DebugInstance)
    ], SaveableEntity.prototype, "__debug", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", EntityRepositoryClass)
    ], SaveableEntity.prototype, "__repo", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], SaveableEntity.prototype, "__contextWarning", null);
    return SaveableEntity;
}(Entity));

var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record(options) {
        return _super.call(this, options) || this;
    }
    return Record;
}(Storable));
var SaveableRecord = /** @class */ (function (_super) {
    __extends(SaveableRecord, _super);
    function SaveableRecord(options, repo) {
        var _this = _super.call(this, options) || this;
        if (repo) {
            _this.__repo = repo;
            _this.__debug = new DebugInstance("db:" + repo.name + ":entity", _this.__repo.$connectionName);
        }
        else {
            _this.__debug = new DebugInstance('*', '');
            _this.__contextWarning();
        }
        return _this;
    }
    SaveableRecord.prototype.__contextWarning = function (optional) {
        if (optional === void 0) { optional = ''; }
        this.__debug.$warn("Seems like the record \"" + this.constructor.name + "\" was initialized in a wrong context.\n" + optional, true);
    };
    SaveableRecord.prototype.$save = function () {
        if (!this.__repo) {
            this.__contextWarning('Saving cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.update(this)
            .then(function (r) { return r.result; })
            .catch(function (e) { throw e; });
    };
    SaveableRecord.prototype.$delete = function () {
        if (!this.__repo) {
            this.__contextWarning('Deletion cannot be done.');
            return Promise.resolve(undefined);
        }
        return this.__repo.delete()
            .then(function (r) { return r.result; })
            .catch(function (e) { throw e; });
    };
    __decorate([
        enumerable(false),
        __metadata("design:type", DebugInstance)
    ], SaveableRecord.prototype, "__debug", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", RecordRepositoryClass)
    ], SaveableRecord.prototype, "__repo", void 0);
    __decorate([
        enumerable(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], SaveableRecord.prototype, "__contextWarning", null);
    return SaveableRecord;
}(Record));

exports.Connection = Connection$1;
exports.Repository = Repository;
exports.EntityRepository = EntityRepository;
exports.RecordRepository = RecordRepository;
exports.RemoteRepository = RemoteRepository;
exports.Storable = Storable;
exports.Entity = Entity;
exports.SaveableEntity = SaveableEntity;
exports.Record = Record;
exports.SaveableRecord = SaveableRecord;
exports.Driver = Driver;
exports.FallbackDriver = FallbackDriver;
exports.MultiDriver = MultiDriver;
//# sourceMappingURL=webalorm.cjs.js.map
