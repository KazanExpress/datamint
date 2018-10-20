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
const _1 = require("./");
const entry_1 = require("../entry");
class LocalStorageDriver {
    constructor() {
        this.name = '';
    }
    isSuitable() {
        return typeof localStorage !== 'undefined';
    }
    setName(name) {
        this.name = name;
    }
    get(key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            let obj = this.getRootFromPath(key);
            if (obj) {
                let path = key.split('/').slice(1).join('/');
                result = _1.fromPath(obj, path, '/');
            }
            return new entry_1.default(this, key, result, fetchHandler);
        });
    }
    add(key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = this.getRootFromPath(key);
            obj = typeof obj === 'object' ? Object(obj) : {};
            let pathArr = key.split('/');
            let path = pathArr.slice(1).join('/');
            obj = this.setDeepVal(obj, path, entry);
            localStorage.setItem(`${this.name}_${pathArr[0]}`, JSON.stringify(obj));
            return true;
        });
    }
    setDeepVal(obj, path, val) {
        if (!path) {
            if (typeof val === 'object') {
                return Object.assign({}, obj, val);
            }
            return obj;
        }
        let props = path.split('/');
        let workingObj = obj;
        for (var i = 0, n = props.length - 1; i < n; ++i) {
            workingObj = workingObj[props[i]] = workingObj[props[i]] || {};
        }
        workingObj[props[i]] = val;
        return obj;
    }
    getRootFromPath(path) {
        let rootPath = path.split('/')[0];
        if (rootPath) {
            let stringObj = localStorage.getItem(`${this.name}_${rootPath}`);
            if (stringObj) {
                return JSON.parse(stringObj);
            }
        }
    }
}
exports.LocalStorageDriver = LocalStorageDriver;
//# sourceMappingURL=LocalStorageDriver.js.map