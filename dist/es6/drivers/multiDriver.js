import { Driver } from './base';
export class MultiDriver extends Driver {
    constructor(connection, drivers) {
        super(connection);
        this.create = this.request('create');
        this.findById = this.request('findById');
        this.update = this.request('update');
        this.updateOne = this.request('updateOne');
        this.deleteOne = this.request('deleteOne');
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
//# sourceMappingURL=multiDriver.js.map