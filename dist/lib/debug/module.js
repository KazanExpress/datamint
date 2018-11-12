"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOG_PREFIX = (name) => name ? `[WEBALORM:${name}]` : `[WEBALORM]`;
/**
 * Shows the current debug state of WEBALORM
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
    const isString = (t) => typeof t === 'string';
    if (isString(type) && exports.debugMap[type]) {
        return exports.debugMap[type];
    }
    if (isString(type)) {
        const matchingType = Object.keys(exports.debugMap)
            .find(t => !!t && t.includes(type) && !!exports.debugMap[t]);
        return matchingType || false;
    }
    return Object.keys(exports.debugMap).find(t => type.test(t)) || false;
}
exports.errorTypeFor = errorTypeFor;
function print(instanceName, type, message, level) {
    if (exports.debugState !== 'disabled') {
        const errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
            }
            else {
                console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
            }
        }
    }
}
exports.print = print;
const decoratedLogs = {};
function prints(message, level = 'log', type = '*') {
    return (target, key, desc) => {
        Object.defineProperty(decoratedLogs, key, desc || {
            value: undefined,
            writable: true,
            enumerable: true
        });
        Object.defineProperty(target, key, {
            get: () => {
                print('', type, message, level);
                return decoratedLogs[key];
            },
            set: v => {
                decoratedLogs[key] = v;
            }
        });
    };
}
exports.prints = prints;
//# sourceMappingURL=module.js.map