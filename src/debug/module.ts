const LOG_PREFIX = (name: string) => name ? `[datamint:${name}]` : `[datamint]`;

/**
 * A type of debug errors
 *
 * - `soft` - informative, only logs to console
 * - `hard` - throws exceptions, forcing proper error-handling
 */
export type ExceptionType = 'soft' | 'hard';

/**
 * Dictates the type of debug to set
 *
 * - `*` - debug everything
 * - `connection` - debug the orm connection
 * - `driver` - debug all drivers
 * - `driver:${name}` - debug a driver with ${name}
 * - `db` - debug all repositories
 * - `db:${name}` - debug a repo with ${name}
 * - `db:${name}:entity` - debug all entities in the repository
 */
export type DebugType = '*'
  | 'connection'
  | 'driver'
  // tslint:disable-next-line:no-invalid-template-strings - Need this for correct autocomplete
  | 'driver:${name}'
  | 'db'
  // tslint:disable-next-line:no-invalid-template-strings - Need this for correct autocomplete
  | 'db:${name}'
  // tslint:disable-next-line:no-invalid-template-strings - Need this for correct autocomplete
  | 'db:${name}:entity';

export type DebugState = 'enabled' | 'disabled' | 'custom';

/**
 * Maps all debug types to all errors types, telling which debug type will throw
 */
export type DebugMap = Partial<{
  [key: string]: boolean | ExceptionType;
}>;

export type LogLevel = 'log' | 'debug' | 'warn' | 'error';


/**
 * Shows the current debug state of DATAMINT
 *
 * - `enabled` - all the logs and exceptions are enabled
 * - `custom` - custom rules are set via a `debug()` function
 * - `disabled` - all the logs and most exceptions are suppressed
 */
export let debugState: DebugState = 'disabled';


/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
export const debugMap: DebugMap = {};

export function setDebugState(state: DebugState) {
  debugState = state;
}



/**
 * Returns the current error type for a specific type of debugging
 */
export function errorTypeFor(type: string): boolean | ExceptionType;
export function errorTypeFor(type: RegExp): boolean | ExceptionType;
export function errorTypeFor(type: DebugType): boolean | ExceptionType;
export function errorTypeFor(type: string | RegExp | DebugType): boolean | ExceptionType {
  if (debugMap['*']) { return debugMap['*']!; }

  const isString = (t: any): t is string => typeof t === 'string';

  if (isString(type) && debugMap[type]) {
    return debugMap[type]!;
  }

  if (isString(type)) {
    const matchingType = Object.keys(debugMap)
      .find(t => !!t && t.includes(type) && !!debugMap[t]) as ExceptionType | undefined;

    return matchingType || false;
  }

  return (Object.keys(debugMap).find(t => type.test(t)) as ExceptionType | undefined) || false;
}


export function print(instanceName: string, type: any, message: any, level: LogLevel, force: boolean = false) {
  if ((debugState !== 'disabled') || force) {
    const errorType = errorTypeFor(type);
    if (errorType) {
      if (errorType === 'hard' && level === 'error') {
        throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
      } else {
        if (typeof window !== 'undefined') {
          window.console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`,
            'color: purple',
            'color: initial',
            'color: blue',
            'color: initial'
          );
        } else {
          console[level](`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
        }
      }
    }
  }
}
