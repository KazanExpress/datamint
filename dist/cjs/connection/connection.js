"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("../debug");
var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    /**
     * Creates a connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param repositories sets the relation of a repository name to its contents' options.
     */
    function Connection(connectionName, repositories) {
        var _this = _super.call(this) || this;
        _this.connectionName = connectionName;
        _this.debugType = "connection";
        /**
         * A current map of bound repositories
         */
        _this.repositories = {};
        var reProxy;
        if (!Proxy) {
            _this.$warn("Proxy is unavailable. Using insufficient property forwarding.");
            reProxy = function (repoName) { return Object.defineProperty(_this, repoName, {
                get: function () { return _this.repositories[repoName]; },
            }); };
        }
        for (var repoName in repositories) {
            _this.repositories[repoName] = repositories[repoName](repoName, _this);
            reProxy && reProxy(repoName);
        }
        // Make repositories immutable
        _this.repositories = Object.freeze(_this.repositories);
        if (Proxy) {
            _this.$log("Proxy is available. Using modern property forwarding.");
            return new Proxy(_this, {
                get: function (target, key) {
                    if (!target.repositories[key]) {
                        if (typeof target[key] === 'undefined') {
                            target.$warn("Repository \"" + key + "\" is not registered upon initialization. No other property with the same name was found.");
                        }
                        return target[key];
                    }
                    return target.repositories[key];
                }
            });
        }
        return _this;
    }
    Connection.$debug = function (type, exceptions) {
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
    };
    return Connection;
}(debug_1.Debugable));
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map