import { DebugType } from './namespace';
import { WebORM } from '.';

export type LogLevel = 'log' | 'debug' | 'warn' | 'error';

export const LOG_PREFIX = (name: string) => name ? `[WebORM:${name}]` : `[WebORM]`;

export function error(instanceName: string, type: string, message: string);
export function error(instanceName: string, type: RegExp, message: string);
export function error(instanceName: string, type: DebugType, message: string);
export function error(instanceName: string, type: any, message: string) {
  return print(instanceName, type, message, 'error');
}

export function log(instanceName: string, type: string, message: string);
export function log(instanceName: string, type: RegExp, message: string);
export function log(instanceName: string, type: DebugType, message: string);
export function log(instanceName: string, type: any, message: string) {
  return print(instanceName, type, message, 'log');
}

export function warn(instanceName: string, type: string, message: string);
export function warn(instanceName: string, type: RegExp, message: string);
export function warn(instanceName: string, type: DebugType, message: string);
export function warn(instanceName: string, type: any, message: string) {
  return print(instanceName, type, message, 'warn');
}

export function print(instanceName: string, type: any, message: string, level: LogLevel) {
  if (WebORM.DebugEnabled) {
    const errorType = WebORM.errorType(type);
    if (errorType) {
      if (errorType === 'hard' && level === 'error') {
        throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
      } else {
        console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - ${message}`,
          'color: purple',
          'color: initial',
          'color: blue',
          'color: initial'
        );
      }
    }
  }
}

export function prints(message: string, level: LogLevel = 'log', type: DebugType = '*') {
  return (target, key: string) => print('', type, message, level);
}