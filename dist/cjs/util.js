"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * fromPath
 * Returns a value from an object by a given path (usually string).
 *
 * @see [gist](https://gist.github.com/Raiondesu/759425dede5b7ff38db51ea5a1fb8f11)
 *
 * @param obj an object to get a value from.
 * @param path to get a value by.
 * @param splitter to split the path by. Default is '.' ('obj.path.example')
 * @returns a value from a given path. If a path is invalid - returns undefined.
 */
function fromPath(obj, path, splitter) {
    if (splitter === void 0) { splitter = '.'; }
    if (!path)
        return obj;
    if (typeof path === 'number' || !~path.indexOf(splitter))
        return obj[path];
    return path.split(splitter).reduce(function (o, i) { return (o === Object(o) ? o[i] : o); }, obj);
}
exports.fromPath = fromPath;
//# sourceMappingURL=util.js.map