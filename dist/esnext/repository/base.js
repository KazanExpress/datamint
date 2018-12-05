import { Debug, Debugable } from '../debug';
import { FallbackDriver } from '../drivers';
import { MultiDriver } from '../drivers/multiDriver';
export class Repository extends Debugable {
    constructor(name, $connectionName, Data, api) {
        super();
        this.name = name;
        this.$connectionName = $connectionName;
        this.Data = Data;
        this.api = api;
        this.$debugType = `db:${this.name.toLowerCase()}`;
        if (!api) {
            this.$warn('The main functionality is disabled. Are you sure you want to use this without API?', true);
        }
        if ( /* this class was instantiated directly (without inheritance) */Repository.prototype === this.constructor.prototype) {
            if (this.$debugEnabled) {
                this.$error(`Using default empty repository.`);
            }
            else {
                Debug.$error(`Using default empty repository for ${name}`, true);
            }
        }
    }
    makeDataInstance(options) {
        // Cast to any to allow passing `this` as a second arg for classes implementing IActiveRecord to work
        return new this.Data(options, this);
    }
}
export function selectDriver(drivers, repoName) {
    const error = () => {
        let msg = `No supported driver provided for ${repoName}.`;
        if (Debug.map['*'] !== 'hard') {
            msg += ' Using fallback.';
        }
        Debug.$error(msg);
    };
    if (Array.isArray(drivers)) {
        // Select the first supported driver from the bunch
        const SupportedDrivers = drivers.filter(d => d.isSupported);
        if (SupportedDrivers.length > 0) {
            return SupportedDrivers[0];
        }
        else {
            return error(), FallbackDriver;
        }
    }
    else if (drivers instanceof MultiDriver) {
        return drivers;
    }
    else {
        return error(), FallbackDriver;
    }
}
//# sourceMappingURL=base.js.map