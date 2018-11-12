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
 * - `db:${name}:entity:${name}` - debug entity ${name}
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
 * Shows the current debug state of WebRM
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
