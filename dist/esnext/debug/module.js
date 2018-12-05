const LOG_PREFIX = (name) => name ? `[webalorm:${name}]` : `[webalorm]`;
/**
 * Shows the current debug state of WEBALORM
 *
 * - `enabled` - all the logs and exceptions are enabled
 * - `custom` - custom rules are set via a `debug()` function
 * - `disabled` - all the logs and most exceptions are suppressed
 */
export let debugState = 'disabled';
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
export const debugMap = {};
export function setDebugState(state) {
    debugState = state;
}
export function errorTypeFor(type) {
    if (debugMap['*']) {
        return debugMap['*'];
    }
    const isString = (t) => typeof t === 'string';
    if (isString(type) && debugMap[type]) {
        return debugMap[type];
    }
    if (isString(type)) {
        const matchingType = Object.keys(debugMap)
            .find(t => !!t && t.includes(type) && !!debugMap[t]);
        return matchingType || false;
    }
    return Object.keys(debugMap).find(t => type.test(t)) || false;
}
export function print(instanceName, type, message, level, force = false) {
    if ((debugState !== 'disabled') || force) {
        const errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
            }
            else {
                if (typeof window !== 'undefined') {
                    window.console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`, 'color: purple', 'color: initial', 'color: blue', 'color: initial');
                }
                else {
                    console[level](`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
                }
            }
        }
    }
}
//# sourceMappingURL=module.js.map