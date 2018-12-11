const LOG_PREFIX = (name) => name ? `[datamint:${name}]` : `[datamint]`;
/**
 * Shows the current debug state of DATAMINT
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
function bindConsole(name, instanceName, type) {
    if (typeof window !== 'undefined') {
        return window.console[name].bind(console, `%c${LOG_PREFIX(instanceName)}%c:%c${type}%c`, 'color: purple', 'color: initial', 'color: blue', 'color: initial', '-');
    }
    else {
        return console[name].bind(console, `${LOG_PREFIX(instanceName)}:${type}`, '-');
    }
}
export function getPrintFunction(instanceName, type, level) {
    if ((debugState !== 'disabled')) {
        const errorType = errorTypeFor(type);
        if (errorType) {
            if (errorType === 'hard' && level === 'error') {
                return (message) => { throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`); };
            }
            else {
                return bindConsole(level, instanceName, type);
            }
        }
    }
    return () => undefined;
}
//# sourceMappingURL=module.js.map