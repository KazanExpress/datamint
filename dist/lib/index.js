"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const NoDriver_1 = require("./drivers/NoDriver");
const entry_1 = require("./entry");
__export(require("./drivers"));
const LOG_PREFIX = '[WebORM] ';
class WebORM {
    constructor(name, options = {}) {
        this.name = name;
        this.APIMap = options.APIMap || {};
        this.driver = new NoDriver_1.NoDriver();
        if (options.drivers) {
            options.drivers.forEach(driver => {
                if ((this.driver instanceof NoDriver_1.NoDriver) && driver.isSuitable()) {
                    this.driver = driver;
                }
            });
        }
        if (this.driver instanceof NoDriver_1.NoDriver) {
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
exports.default = WebORM;
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
            return new entry_1.default(this, key, null, fetchHandler);
        });
    }
    add(key, entry, fetchHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.WebORMDriver = WebORMDriver;
//# sourceMappingURL=index.js.map