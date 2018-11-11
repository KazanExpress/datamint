"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOG_PREFIX = (name) => name ? `[WebRM:${name}]` : `[WebRM]`;
class Debug {
    constructor() { }
    /**
     * `true` if any debug is enabled
     */
    static get isEnabled() { return this.debugState !== 'disabled'; }
    /**
     * Shows the current debug state of WebRM
     *
     * - `enabled` - all the logs and exceptions are enabled
     * - `custom` - custom rules are set via a `debug()` function
     * - `disabled` - all the logs and most exceptions are suppressed
     */
    static get state() { return this.debugState; }
    static set state(v) { this.debugState = v; }
    static error(instanceName, type, message) {
        return this.print(instanceName, type, message, 'error');
    }
    static log(instanceName, type, message) {
        return this.print(instanceName, type, message, 'log');
    }
    static warn(instanceName, type, message) {
        return this.print(instanceName, type, message, 'warn');
    }
    static errorType(type) {
        if (this.map['*']) {
            return true;
        }
        const isString = (t) => typeof t === 'string';
        if (isString(type) && this.map[type]) {
            return this.map[type];
        }
        if (isString(type)) {
            const matchingType = Object.keys(this.map)
                .find(t => !!t && t.includes(type) && !!this.map[t]);
            return matchingType || false;
        }
        return Object.keys(this.map).find(t => type.test(t)) || false;
    }
    static print(instanceName, type, message, level) {
        if (this.debugState !== 'disabled') {
            const typeOfError = this.errorType(type);
            if (typeOfError) {
                if (typeOfError === 'hard' && level === 'error') {
                    throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
                }
                else {
                    console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
                }
            }
        }
    }
    static prints(message, level = 'log', type = '*') {
        return (target, key, desc) => {
            Object.defineProperty(this.decoratedLogs, key, desc || {
                value: undefined,
                writable: true,
                enumerable: true
            });
            Object.defineProperty(target, key, {
                get: () => {
                    this.print('', type, message, level);
                    return this.decoratedLogs[key];
                },
                set: v => {
                    this.decoratedLogs[key] = v;
                }
            });
        };
    }
}
Debug.debugState = 'disabled';
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
Debug.map = {};
Debug.decoratedLogs = {};
exports.Debug = Debug;
//# sourceMappingURL=debug.js.map