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

var Entry = /** @class */ (function () {
    function Entry(driver, path, value, fetchHandler) {
        if (fetchHandler === void 0) { fetchHandler = function () { }; }
        this.driver = driver;
        this.path = path;
        this.value = value;
        this.fetchHandler = fetchHandler;
    }
    Entry.prototype.sync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchHandler()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.driver.add(this.path, data)];
                    case 2:
                        _a.sent();
                        resolve(data);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return Entry;
}());

var NoDriver = /** @class */ (function () {
    function NoDriver() {
    }
    NoDriver.prototype.isSuitable = function () {
        return true;
    };
    NoDriver.prototype.setName = function (name) { };
    NoDriver.prototype.get = function (key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Entry(this, key, null)];
            });
        });
    };
    NoDriver.prototype.add = function (key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    return NoDriver;
}());

var LocalStorageDriver$$1 = /** @class */ (function () {
    function LocalStorageDriver$$1() {
        this.name = '';
    }
    LocalStorageDriver$$1.prototype.isSuitable = function () {
        return typeof localStorage !== 'undefined';
    };
    LocalStorageDriver$$1.prototype.setName = function (name) {
        this.name = name;
    };
    LocalStorageDriver$$1.prototype.get = function (key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function () {
            var result, obj, path;
            return __generator(this, function (_a) {
                result = undefined;
                obj = this.getRootFromPath(key);
                if (obj) {
                    path = key.split('/').slice(1).join('/');
                    result = fromPath(obj, path, '/');
                }
                return [2 /*return*/, new Entry(this, key, result, fetchHandler)];
            });
        });
    };
    LocalStorageDriver$$1.prototype.add = function (key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, pathArr, path;
            return __generator(this, function (_a) {
                obj = this.getRootFromPath(key);
                obj = typeof obj === 'object' ? Object(obj) : {};
                pathArr = key.split('/');
                path = pathArr.slice(1).join('/');
                obj = this.setDeepVal(obj, path, entry);
                localStorage.setItem(this.name + "_" + pathArr[0], JSON.stringify(obj));
                return [2 /*return*/, true];
            });
        });
    };
    LocalStorageDriver$$1.prototype.setDeepVal = function (obj, path, val) {
        if (!path) {
            if (typeof val === 'object') {
                return __assign({}, obj, val);
            }
            return obj;
        }
        var props = path.split('/');
        var workingObj = obj;
        for (var i = 0, n = props.length - 1; i < n; ++i) {
            workingObj = workingObj[props[i]] = workingObj[props[i]] || {};
        }
        workingObj[props[i]] = val;
        return obj;
    };
    LocalStorageDriver$$1.prototype.getRootFromPath = function (path) {
        var rootPath = path.split('/')[0];
        if (rootPath) {
            var stringObj = localStorage.getItem(this.name + "_" + rootPath);
            if (stringObj) {
                return JSON.parse(stringObj);
            }
        }
    };
    return LocalStorageDriver$$1;
}());

function fromPath(obj, path, sep) {
    if (sep === void 0) { sep = '.'; }
    return path.split(sep).reduce(function (o, i) { return (o === Object(o) ? o[i] : o); }, obj);
}

var LOG_PREFIX = '[WebORM] ';
var WebORM = /** @class */ (function () {
    function WebORM(name, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.name = name;
        this.APIMap = options.APIMap || {};
        this.driver = new NoDriver();
        if (options.drivers) {
            options.drivers.forEach(function (driver) {
                if ((_this.driver instanceof NoDriver) && driver.isSuitable()) {
                    _this.driver = driver;
                }
            });
        }
        if (this.driver instanceof NoDriver) {
            console.warn(LOG_PREFIX + " Warning! You have no suitable driver for database. Using memory instead.");
        }
        this.driver.setName(name);
        this.initPressetData(options.preset);
    }
    WebORM.prototype.initPressetData = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        Object.keys(data).forEach(function (presetKey) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.driver.add(presetKey, data[presetKey])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebORM.prototype.getEntry = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var mapForPath;
            return __generator(this, function (_a) {
                mapForPath = this.APIMap[key];
                if (mapForPath && mapForPath.get) {
                    return [2 /*return*/, this.driver.get(key, mapForPath.get)];
                }
                return [2 /*return*/, this.driver.get(key)];
            });
        });
    };
    WebORM.prototype.addEntry = function (key, entry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.add(key, entry)];
            });
        });
    };
    return WebORM;
}());
var WebORMDriver = /** @class */ (function () {
    function WebORMDriver() {
    }
    /**
     * Checks if driver can operate in current environment
     *
     * @returns is driver suitable
     */
    WebORMDriver.prototype.isSuitable = function () { return false; };
    WebORMDriver.prototype.setName = function (name) { };
    WebORMDriver.prototype.get = function (key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Entry(this, key, null, fetchHandler)];
            });
        });
    };
    WebORMDriver.prototype.add = function (key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    return WebORMDriver;
}());

exports.default = WebORM;
exports.WebORMDriver = WebORMDriver;
exports.fromPath = fromPath;
exports.LocalStorageDriver = LocalStorageDriver$$1;
exports.NoDriver = NoDriver;
//# sourceMappingURL=weborm.cjs.js.map
