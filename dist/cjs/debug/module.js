"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LOG_PREFIX = function (name) { return name ? "[datamint:" + name + "]" : "[datamint]"; };
/**
 * Shows the current debug state of DATAMINT
 *
 * - `enabled` - all the logs and exceptions are enabled
 * - `custom` - custom rules are set via a `debug()` function
 * - `disabled` - all the logs and most exceptions are suppressed
 */
exports.debugState = 'disabled';
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
exports.debugMap = {};
function setDebugState(state) {
    exports.debugState = state;
}
exports.setDebugState = setDebugState;
function errorTypeFor(type) {
    if (exports.debugMap['*']) {
        return exports.debugMap['*'];
    }
    var isString = function (t) { return typeof t === 'string'; };
    if (isString(type) && exports.debugMap[type]) {
        return exports.debugMap[type];
    }
    if (isString(type)) {
        var matchingType = Object.keys(exports.debugMap)
            .find(function (t) { return !!t && t.includes(type) && !!exports.debugMap[t]; });
        return matchingType || false;
    }
    return Object.keys(exports.debugMap).find(function (t) { return type.test(t); }) || false;
}
exports.errorTypeFor = errorTypeFor;
function bindConsole(name, instanceName, type) {
    if (typeof window !== 'undefined') {
        return window.console[name].bind(console, "%c" + LOG_PREFIX(instanceName) + "%c:%c" + type + "%c", 'color: purple', 'color: initial', 'color: blue', 'color: initial', '-');
    }
    else {
        return console[name].bind(console, LOG_PREFIX(instanceName) + ":" + type, '-');
    }
}
function getPrintFunction(instanceName, type, level) {
    if ((exports.debugState !== 'disabled')) {
        var errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                return function (message) { throw new Error(LOG_PREFIX(instanceName) + ":" + type + " - " + message); };
            }
            else {
                return bindConsole(level, instanceName, type);
            }
        }
    }
    return function () { return undefined; };
}
exports.getPrintFunction = getPrintFunction;
//# sourceMappingURL=module.js.map