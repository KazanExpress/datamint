import { Debugable, debugMap, debugState, setDebugState } from '../debug';
export class Connection extends Debugable {
    /**
     * Creates a connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param repositories sets the relation of a repository name to its contents' options.
     */
    constructor(name, repositories) {
        super();
        this.name = name;
        this.$debugType = `connection`;
        this.$connectionName = this.name;
        /**
         * A current map of bound repositories
         */
        this.repositories = {};
        let reProxy;
        if (!Proxy) {
            this.$warn(`Proxy is unavailable. Using insufficient property forwarding.`);
            reProxy = (repoName) => Object.defineProperty(this, repoName, {
                get: () => this.repositories[repoName],
            });
        }
        for (const repoName in repositories) {
            this.repositories[repoName] = repositories[repoName](repoName, this);
            reProxy && reProxy(repoName);
        }
        // Make repositories immutable
        this.repositories = Object.freeze(this.repositories);
        if (Proxy) {
            this.$log(`Proxy is available. Using modern property forwarding.`);
            return new Proxy(this, {
                get(target, key) {
                    if (!target.repositories[key]) {
                        if (typeof target[key] === 'undefined') {
                            target.$warn(`Repository "${key}" is not registered upon initialization. No other property with the same name was found.`);
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
    }
    static $debug(type, exceptions) {
        if (typeof type === 'undefined') {
            return debugState;
        }
        if (typeof type === 'boolean') {
            setDebugState(type ? 'enabled' : 'disabled');
            debugMap['*'] = exceptions || type;
        }
        else {
            setDebugState('custom');
            debugMap[type] = exceptions || !debugMap[type];
        }
        return;
    }
}
//# sourceMappingURL=connection.js.map