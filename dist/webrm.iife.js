var webrm = (function (exports) {
    'use strict';

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

    /**
     * fromPath
     * Returns a value from an object by a given path (usually string).
     *
     * @see [gist](https://gist.github.com/Raiondesu/759425dede5b7ff38db51ea5a1fb8f11)
     *
     * @param obj an object to get a value from.
     * @param path to get a value by.
     * @param splitter to split the path by. Default is '.' ('obj.path.example')
     * @returns a value from a given path. If a path is invalid - returns undefined.
     */
    var Enumerable = function (enumerable) {
        if (enumerable === void 0) { enumerable = true; }
        return function (target, key, desc) {
            if (desc === void 0) { desc = {}; }
            desc.enumerable = enumerable;
        };
    };

    var LOG_PREFIX = function (name) { return name ? "[WebRM:" + name + "]" : "[WebRM]"; };
    /**
     * Shows the current debug state of WebRM
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
    function print(instanceName, type, message, level) {
        if (debugState !== 'disabled') {
            var errorType = errorTypeFor(type);
            if (errorType) {
                if (errorType === 'hard' && level === 'error') {
                    throw new Error(LOG_PREFIX(instanceName) + ":" + type + " - " + message);
                }
                else {
                    console[level]("%c" + LOG_PREFIX(instanceName) + "%c:%c" + type + "%c - " + message, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
                }
            }
        }
    }

    var Debugable = /** @class */ (function () {
        function Debugable() {
            var _this = this;
            this.$logFactory = function (level) { return function (message, force) {
                if (force === void 0) { force = false; }
                if (_this.$debugEnabled || force) {
                    print(_this.$connectionName, _this.$debugType, message, level);
                }
            }; };
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
        __decorate([
            Enumerable(false),
            __metadata("design:type", String)
        ], Debugable.prototype, "$debugType", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", String)
        ], Debugable.prototype, "$connectionName", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], Debugable.prototype, "$debugEnabled", null);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Debugable.prototype, "$logFactory", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Debugable.prototype, "$log", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Debugable.prototype, "$warn", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Debugable.prototype, "$error", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Debugable.prototype, "$debug", void 0);
        return Debugable;
    }());

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
        ApiDriver.prototype.read = function (repositoryName, data) {
            var repo = this.apiMap[repositoryName];
            if (repo && repo.read) {
                return repo.read(data);
            }
            else {
                return Promise.reject( /* TODO: error handling */);
            }
        };
        ApiDriver.prototype.update = function (repositoryName, data, query) {
            return __awaiter(this, void 0, void 0, function () {
                var repo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            repo = this.apiMap[repositoryName];
                            if (!repo || !repo.update) {
                                return [2 /*return*/, Promise.reject( /* TODO: error handling */)];
                            }
                            if (!query) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.read(repositoryName, data)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, repo.update(query(result))];
                        case 2: return [2 /*return*/, repo.update(data)];
                    }
                });
            });
        };
        ApiDriver.prototype.delete = function (repositoryName, data) {
            var repo = this.apiMap[repositoryName];
            if (repo && repo.delete) {
                return repo.delete(data);
            }
            else {
                return Promise.reject( /* TODO: error handling */);
            }
        };
        Object.defineProperty(ApiDriver, "isSupported", {
            get: function () { return true; },
            enumerable: true,
            configurable: true
        });
        return ApiDriver;
    }(Driver));

    /* TODO: driver that just writes everything to short-term memory */
    var FallbackDriver = /** @class */ (function (_super) {
        __extends(FallbackDriver, _super);
        function FallbackDriver() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.repositoryMap = {};
            return _this;
        }
        FallbackDriver.prototype.create = function (repositoryName, entity) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.repositoryMap[repositoryName] = this.repositoryMap[repositoryName] || [];
                    this.repositoryMap[repositoryName].push(entity);
                    return [2 /*return*/, entity];
                });
            });
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
                var idx, res;
                return __generator(this, function (_a) {
                    idx = this.repositoryMap[repositoryName].findIndex(function (e) { return Object.keys(e).some(function (key) {
                        return e[key] === entity[key];
                    }); });
                    res = this.repositoryMap[repositoryName][idx];
                    this.repositoryMap[repositoryName].splice(idx, 1);
                    return [2 /*return*/, res];
                });
            });
        };
        return FallbackDriver;
    }(Driver));

    var Repository = /** @class */ (function (_super) {
        __extends(Repository, _super);
        function Repository(name, connection, Data) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.Data = Data;
            _this.$debugType = "db:" + _this.name.toLowerCase();
            _this.connection = connection;
            _this.$connectionName = connection.name;
            _this.api = connection.apiDriver;
            if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === _this.constructor.prototype) {
                if (_this.$debugEnabled) {
                    _this.$warn("Using default empty repository.");
                }
                else if (Debug.map.db) {
                    _this.$warn("Using default empty repository for " + name, true);
                }
            }
            return _this;
        }
        Repository.prototype.makeDataInstance = function (options) {
            return new this.Data(options, this);
        };
        return Repository;
    }(Debugable));

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
                _this.columns = Object.keys(new entity({}, _this));
            }
            return _this;
        }
        EntityRepository.prototype.add = function (options, 
        // TODO: up to debate - singular arguments always or multiple args inference?
        apiOptions) {
            return __awaiter(this, void 0, void 0, function () {
                var result, instance, queryResult_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.currentDriver.create(this.name, options)];
                        case 1:
                            result = _a.sent();
                            try {
                                instance = this.makeDataInstance(result);
                                queryResult_1 = new QueryResult(true, instance);
                                // Call api driver asynchronously
                                if (apiOptions && this.api) {
                                    this.$log("API handler execution start: " + this.name + ".add()");
                                    this.api.create(this.name, apiOptions).then(function (res) {
                                        queryResult_1.result = _this.makeDataInstance(result);
                                        _this.$log("API handler execution end: " + _this.name + ".add()");
                                    }).catch(function (e) {
                                        queryResult_1.error = e;
                                        _this.$log("API handler execution end: " + _this.name + ".add()");
                                    });
                                }
                                else {
                                    this.$log('No API handler detected');
                                }
                                return [2 /*return*/, queryResult_1];
                            }
                            catch (e) {
                                this.$error(e);
                                return [2 /*return*/, new QueryResult(false, this.makeDataInstance(options), e)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        EntityRepository.prototype.get = function (id) {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        };
        EntityRepository.prototype.update = function (entity) {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        };
        EntityRepository.prototype.updateById = function (id, query) {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
        };
        EntityRepository.prototype.delete = function (entity) {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        };
        // TODO: Find, find by, exists, etc...
        EntityRepository.prototype.count = function () {
            // TODO: count entities
        };
        return EntityRepository;
    }(Repository));

    var Storable = /** @class */ (function (_super) {
        __extends(Storable, _super);
        function Storable($repository) {
            var _this = _super.call(this) || this;
            _this.$repository = $repository;
            _this.$debugType = "db:" + _this.$repository.name + ":entity";
            _this.$connectionName = _this.$repository.$connectionName;
            return _this;
        }
        return Storable;
    }(Debugable));

    var Entity = /** @class */ (function (_super) {
        __extends(Entity, _super);
        function Entity(options, $repository) {
            var _this = _super.call(this, $repository) || this;
            // TODO: check to be writable
            _this.__col__ = [];
            if (_this.__idCol__) {
                _this.__idValue__ = options[_this.__idCol__];
            }
            return _this;
        }
        Entity.prototype.$save = function () {
            /* TODO */
            throw new Error('Method not implemented.');
        };
        Entity.prototype.$delete = function () {
            /* TODO */
            throw new Error('Method not implemented.');
        };
        Entity.Column = function (target, key) {
            target.__col__.push(key);
        };
        Entity.ID = function (target, key) {
            target.__idCol__ = key;
        };
        __decorate([
            Enumerable(false),
            __metadata("design:type", Array)
        ], Entity.prototype, "__col__", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Entity.prototype, "__idCol__", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Object)
        ], Entity.prototype, "__idValue__", void 0);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], Entity.prototype, "$save", null);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], Entity.prototype, "$delete", null);
        return Entity;
    }(Storable));
    var Column = Entity.Column;
    var ID = Entity.ID;

    var Record = /** @class */ (function (_super) {
        __extends(Record, _super);
        function Record(options, $repository) {
            return _super.call(this, $repository) || this;
        }
        Record.prototype.$save = function () {
            /* TODO */
            throw new Error('Method not implemented.');
        };
        Record.prototype.$delete = function () {
            /* TODO */
            throw new Error('Method not implemented.');
        };
        __decorate([
            Enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], Record.prototype, "$save", null);
        __decorate([
            Enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], Record.prototype, "$delete", null);
        return Record;
    }(Storable));

    /**
     * A single-entity repository.
     *
     * @template `DM` API data map for the repo
     * @template `C` entity constructor type
     * @template `E` entity instance type
     * @template `A` entity constructor parameter options
     */
    var RecordRepository = /** @class */ (function (_super) {
        __extends(RecordRepository, _super);
        function RecordRepository() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RecordRepository.prototype.create = function (options) {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        };
        RecordRepository.prototype.update = function (options) {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        };
        RecordRepository.prototype.read = function () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
        };
        RecordRepository.prototype.delete = function () {
            throw new Error('Not implemented');
            return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
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
            print(connection.name, 'db', "No suitable repository found for " + data.name + " when trying to connect with " + name + ".", 'error');
            Constructor = Repository;
        }
        return new Constructor(name, connection, data);
    }

    var Connection = /** @class */ (function (_super) {
        __extends(Connection, _super);
        /**
         * Creates a WebRM connection instance.
         * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
         * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
         * @param repositories sets the relation of a repository name to its contents' prototype.
         * @param apiMap maps the API calls onto the current data structure
         */
        function Connection(name, drivers, repositories, apiMap) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.drivers = drivers;
            _this.apiMap = apiMap;
            _this.$debugType = "connection";
            _this.$connectionName = _this.name;
            /**
             * A current map of bound repositories
             */
            _this.repositories = {};
            if (apiMap) {
                _this.apiDriver = new ApiDriver(_this, apiMap);
            }
            else {
                Debug.$warn('The main webrm functionality is disabled. Are you sure you want to use this without API?', true);
            }
            // Select the first supported driver from the bunch
            var SupportedDriver = drivers.find(function (d) { return d.isSupported; });
            if (SupportedDriver) {
                // TODO: multi-driver mode
                _this.$log("Using driver \"" + SupportedDriver.name + "\" as the first supported driver");
                _this.currentDriver = new SupportedDriver(_this);
            }
            else {
                _this.$warn('No supported driver provided. Using fallback.');
                _this.currentDriver = new FallbackDriver(_this);
            }
            var reProxy;
            if (!Proxy) {
                _this.$warn("window.Proxy is unavailable. Using insufficient property forwarding.");
                reProxy = function (repoName) { return Object.defineProperty(_this, repoName, {
                    get: function () { return _this.repositories[repoName]; },
                }); };
            }
            for (var repoName in repositories) {
                var name_1 = repoName;
                var entityConstructor = repositories[name_1];
                _this.repositories[name_1] = makeRepository(name_1, {
                    name: _this.name,
                    apiDriver: _this.apiMap && _this.apiMap[name_1] && _this.apiDriver,
                    currentDriver: _this.currentDriver,
                }, entityConstructor);
                reProxy && reProxy(name_1);
            }
            if (Proxy) {
                _this.$log("window.Proxy is available. Using modern property forwarding.");
                return new Proxy(_this, {
                    get: function (target, key) {
                        if (!target.repositories[key]) {
                            if (!target[key]) {
                                target.$log("Repository \"" + key + "\" is not registered upon initialization. No other property with the same name was found.");
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

    exports.Connection = Connection$1;
    exports.Entity = Entity;
    exports.Column = Column;
    exports.ID = ID;
    exports.Record = Record;
    exports.Storable = Storable;

    return exports;

}({}));
//# sourceMappingURL=webrm.iife.js.map
