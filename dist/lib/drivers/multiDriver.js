"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class MultiDriver extends base_1.Driver {
    constructor(connection, drivers) {
        super(connection);
        this.create = this.request('create');
        this.read = this.request('read');
        this.update = this.request('update');
        this.delete = this.request('delete');
        this.drivers = drivers.filter(d => d.isSupported).map(D => new D(connection));
    }
    request(type) {
        return function () {
            const args = arguments;
            const allResponses = Promise.all(this.drivers.map(d => d[type].apply(d, args)));
            return allResponses[0];
        }.bind(this);
    }
    static get isSupported() { return true; }
}
exports.MultiDriver = MultiDriver;
//# sourceMappingURL=multiDriver.js.map