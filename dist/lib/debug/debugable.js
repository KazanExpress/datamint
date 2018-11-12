"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
class Debugable {
    constructor() {
        this.logFactory = (level) => message => module_1.print(this.connectionName, this.debugType, message, level);
        this.log = this.logFactory('log');
        this.warn = this.logFactory('warn');
        this.error = this.logFactory('error');
        this.debug = this.logFactory('debug');
    }
    /**
     * `true` if the debug is enabled for this class
     */
    get debugEnabled() { return module_1.errorTypeFor(this.debugType); }
}
exports.Debugable = Debugable;
//# sourceMappingURL=debugable.js.map