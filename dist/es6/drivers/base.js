import { Debugable } from '../debug';
export class Driver extends Debugable {
    constructor(connection) {
        super();
        this.connection = connection;
        this.$debugType = 'driver';
        this.$connectionName = this.connection.name;
    }
    /**
     * Determines if the driver is supported in current environment
     */
    static get isSupported() {
        throw new Error('Not implemented.');
    }
}
//# sourceMappingURL=base.js.map