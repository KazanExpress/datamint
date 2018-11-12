"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug");
const api_1 = require("../drivers/api");
const fallback_1 = require("../drivers/fallback");
const repository_1 = require("../repository");
class Connection extends debug_1.Debugable {
    /**
     * Creates a WebRM connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current data structure
     */
    constructor(name, drivers, repositories, apiMap) {
        super();
        this.name = name;
        this.drivers = drivers;
        this.apiMap = apiMap;
        this.debugType = `connection`;
        this.connectionName = this.name;
        /**
         * A current map of bound repositories
         */
        this.repositories = {};
        if (apiMap) {
            this.apiDriver = new api_1.ApiDriver(this, apiMap);
        }
        else {
            this.log('The main webrm functionality is disabled. Are you sure you want to use this without API?');
        }
        // Select the first supported driver from the bunch
        const SupportedDriver = drivers.find(d => d.isSupported);
        if (SupportedDriver) {
            // TODO: multi-driver mode
            this.log(`Using driver "${SupportedDriver.name}" as the first supported driver`);
            this.currentDriver = new SupportedDriver(this);
        }
        else {
            this.warn('No supported driver provided. Using fallback.');
            this.currentDriver = new fallback_1.FallbackDriver(this);
        }
        let reProxy;
        if (!Proxy) {
            this.warn(`window.Proxy is unavailable. Using insufficient property forwarding.`);
            reProxy = (repoName) => Object.defineProperty(this, repoName, {
                get: () => this.repositories[repoName],
            });
        }
        for (const repoName in repositories) {
            const name = repoName;
            const entityConstructor = repositories[name];
            this.repositories[name] = repository_1.makeRepository(name, {
                name: this.name,
                apiDriver: this.apiMap && this.apiMap[name] && this.apiDriver,
                currentDriver: this.currentDriver,
            }, entityConstructor);
            reProxy && reProxy(name);
        }
        if (Proxy) {
            this.log(`window.Proxy is available. Using modern property forwarding.`);
            return new Proxy(this, {
                get(target, key) {
                    if (!target.repositories[key]) {
                        if (!target[key]) {
                            target.log(`Repository "${key}" is not registered upon initialization. No other property with the same name was found.`);
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
    }
    static debug(type, exceptions) {
        if (typeof type === 'undefined') {
            return debug_1.debugState;
        }
        if (typeof type === 'boolean') {
            debug_1.setDebugState(type ? 'enabled' : 'disabled');
            debug_1.debugMap['*'] = exceptions || type;
        }
        else {
            debug_1.setDebugState('custom');
            debug_1.debugMap[type] = exceptions || !debug_1.debugMap[type];
        }
        return;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map