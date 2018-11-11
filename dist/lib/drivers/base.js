"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Driver {
    constructor(connection) {
        this.connection = connection;
    }
    /**
     * Determines if the driver is supported in current environment
     */
    static get isSupported() {
        throw new Error('Not implemented.');
    }
}
exports.Driver = Driver;
//# sourceMappingURL=base.js.map