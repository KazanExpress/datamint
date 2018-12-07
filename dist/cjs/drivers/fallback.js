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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var base_1 = require("./base");
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
                if (primaryKey && !Array.isArray(repo)) {
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
        var name = _a.name;
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
}(base_1.Driver));
exports.FallbackDriver = FallbackDriver;
//# sourceMappingURL=fallback.js.map