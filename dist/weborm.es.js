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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Entry {
    constructor(driver, path, value, fetchHandler = () => { }) {
        this.driver = driver;
        this.path = path;
        this.value = value;
        this.fetchHandler = fetchHandler;
    }
    sync() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.fetchHandler();
            yield this.driver.add(this.path, data);
            resolve(data);
        }));
    }
}

class NoDriver {
    isSuitable() {
        return true;
    }
    setName(name) { }
    get(key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Entry(this, key, null);
        });
    }
    add(key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}

class LocalStorageDriver$$1 {
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
                result = fromPath(obj, path, '/');
            }
            return new Entry(this, key, result, fetchHandler);
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

function fromPath(obj, path, sep = '.') {
    return path.split(sep).reduce((o, i) => (o === Object(o) ? o[i] : o), obj);
}

const LOG_PREFIX = '[WebORM] ';
class WebORM {
    constructor(name, options = {}) {
        this.name = name;
        this.APIMap = options.APIMap || {};
        this.driver = new NoDriver();
        if (options.drivers) {
            options.drivers.forEach(driver => {
                if ((this.driver instanceof NoDriver) && driver.isSuitable()) {
                    this.driver = driver;
                }
            });
        }
        if (this.driver instanceof NoDriver) {
            console.warn(`${LOG_PREFIX} Warning! You have no suitable driver for database. Using memory instead.`);
        }
        this.driver.setName(name);
        this.initPressetData(options.preset);
    }
    initPressetData(data = {}) {
        Object.keys(data).forEach((presetKey) => __awaiter(this, void 0, void 0, function* () {
            yield this.driver.add(presetKey, data[presetKey]);
        }));
    }
    getEntry(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let mapForPath = this.APIMap[key];
            if (mapForPath && mapForPath.get) {
                return this.driver.get(key, mapForPath.get);
            }
            return this.driver.get(key);
        });
    }
    addEntry(key, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driver.add(key, entry);
        });
    }
}
class WebORMDriver {
    /**
     * Checks if driver can operate in current environment
     *
     * @returns is driver suitable
     */
    isSuitable() { return false; }
    setName(name) { }
    get(key, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Entry(this, key, null, fetchHandler);
        });
    }
    add(key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}

export default WebORM;
export { WebORMDriver, fromPath, LocalStorageDriver$$1 as LocalStorageDriver, NoDriver };
//# sourceMappingURL=weborm.es.js.map
