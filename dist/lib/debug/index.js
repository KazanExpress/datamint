"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const debugable_1 = require("./debugable");
const module_1 = require("./module");
class GlobalDebug extends debugable_1.Debugable {
    constructor() {
        super();
        this.debugType = '*';
        this.connectionName = '';
    }
    get map() {
        return module_1.debugMap;
    }
    get state() {
        return module_1.debugState;
    }
}
GlobalDebug.instance = new GlobalDebug();
exports.Debug = GlobalDebug.instance;
__export(require("./debugable"));
__export(require("./module"));
//# sourceMappingURL=index.js.map