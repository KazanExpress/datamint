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
var base_1 = require("./base");
var RemoteRepositoryClass = /** @class */ (function (_super) {
    __extends(RemoteRepositoryClass, _super);
    function RemoteRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RemoteRepositoryClass.prototype, "API", {
        get: function () {
            return this.api;
        },
        enumerable: true,
        configurable: true
    });
    return RemoteRepositoryClass;
}(base_1.Repository));
exports.RemoteRepositoryClass = RemoteRepositoryClass;
function RemoteRepository(options) {
    return function (name, connection) { return new RemoteRepositoryClass(name, connection.name, options.model, options.api); };
}
exports.RemoteRepository = RemoteRepository;
//# sourceMappingURL=remote.js.map