"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./LocalStorageDriver"));
__export(require("./NoDriver"));
function fromPath(obj, path, sep = '.') {
    return path.split(sep).reduce((o, i) => (o === Object(o) ? o[i] : o), obj);
}
exports.fromPath = fromPath;
//# sourceMappingURL=index.js.map