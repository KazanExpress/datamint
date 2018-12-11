/**
 * A type of debug errors
 *
 * - `soft` - informative, only logs to console
 * - `hard` - throws exceptions, forcing proper error-handling
 */
export declare type ExceptionType = 'soft' | 'hard';
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
export declare type DebugType = '*' | 'connection' | 'driver' | 'driver:${name}' | 'db' | 'db:${name}' | 'db:${name}:entity';
export declare type DebugState = 'enabled' | 'disabled' | 'custom';
/**
 * Maps all debug types to all errors types, telling which debug type will throw
 */
export declare type DebugMap = Partial<{
    [key: string]: boolean | ExceptionType;
}>;
export declare type LogLevel = 'log' | 'debug' | 'warn' | 'error';
/**
 * Shows the current debug state of DATAMINT
 *
 * - `enabled` - all the logs and exceptions are enabled
 * - `custom` - custom rules are set via a `debug()` function
 * - `disabled` - all the logs and most exceptions are suppressed
 */
export declare let debugState: DebugState;
/**
 * Contains the map for all debug types and their respective error types for the ORM.
 */
export declare const debugMap: DebugMap;
export declare function setDebugState(state: DebugState): void;
/**
 * Returns the current error type for a specific type of debugging
 */
export declare function errorTypeFor(type: string): boolean | ExceptionType;
export declare function errorTypeFor(type: RegExp): boolean | ExceptionType;
export declare function errorTypeFor(type: DebugType): boolean | ExceptionType;
export declare function getPrintFunction(instanceName: string, type: any, level: LogLevel): (message: any) => undefined;
