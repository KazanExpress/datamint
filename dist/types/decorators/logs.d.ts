import { DebugType, LogLevel } from '../debug';
declare type MessageFactory = ((this: any, ...args: any[]) => string) | ((key: PropertyKey, value: any, newValue?: any) => string) | string;
/**
 *
 *
 * @param message
 * A factory for log messages.
 * Can be one of 3 types:
 * 1. A function that returns a string - has the same context as the decorated property
 * 2. A string - any string you'd like to print
 *
 * A function accepts 2 types of arguments:
 * - If the `prints` decorator is applied to a function - accepts arguments of the function call;
 * - If applied to a property - accepts key and value of the property if the property is being read and a new value if a property is being set;
 *
 * @param [level] a log level to print to. Can be one of 'log', 'warn', 'error' or 'debug'
 * @param [type] the log type. See {@link LogLevel} for more details
 */
export declare function prints(message: MessageFactory, level?: LogLevel, type?: string): any;
export declare function prints(message: MessageFactory, level?: LogLevel, type?: DebugType): any;
export declare function prints(message: MessageFactory, level?: LogLevel, type?: RegExp): any;
export {};
