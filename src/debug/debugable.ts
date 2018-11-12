import { DebugType, ExceptionType, debugMap, LogLevel, debugState } from './module';

const LOG_PREFIX = (name: string) => name ? `[WebRM:${name}]` : `[WebRM]`;

export abstract class Debugable {
  /**
   * The debug type for this class' actions
   */
  protected readonly abstract debugType: DebugType;

  /**
   * The name of the WebRM connection this class uses
   */
  protected readonly abstract connectionName: string;

  /**
   * `true` if the debug is enabled for this class
   */
  public get debugEnabled() { return (this.constructor as typeof Debugable).errorTypeFor(this.debugType); }

  protected error(message: any);
  protected error(message: any);
  protected error(message: any);
  protected error(message: any) {
    return (this.constructor as typeof Debugable).print(
      this.connectionName,
      this.debugType,
      message,
      'error'
    );
  }

  protected log(message: any);
  protected log(message: any);
  protected log(message: any);
  protected log(message: any) {
    return (this.constructor as typeof Debugable).print(
      this.connectionName,
      this.debugType,
      message,
      'log'
    );
  }

  protected warn(message: any);
  protected warn(message: any);
  protected warn(message: any);
  protected warn(message: any) {
    return (this.constructor as typeof Debugable).print(
      this.connectionName,
      this.debugType,
      message,
      'warn'
    );
  }


  /**
   * Returns the current error type for a specific type of debugging
   */
  protected static errorTypeFor(type: string): boolean | ExceptionType;
  protected static errorTypeFor(type: RegExp): boolean | ExceptionType;
  protected static errorTypeFor(type: DebugType): boolean | ExceptionType;
  protected static errorTypeFor(type: string | RegExp | DebugType): boolean | ExceptionType {
    if (debugMap['*']) { return debugMap['*']!; }

    const isString = (t): t is string => typeof t === 'string';

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


  protected static print(instanceName: string, type: any, message: any, level: LogLevel) {
    if (debugState !== 'disabled') {
      const errorType = this.errorTypeFor(type);
      if (errorType) {
        if (errorType === 'hard' && level === 'error') {
          throw new Error(`${LOG_PREFIX(instanceName)}:${type} - ${message}`);
        } else {
          console[level](`%c${LOG_PREFIX(instanceName)}%c:%c${type}%c - `, message,
            'color: purple',
            'color: initial',
            'color: blue',
            'color: initial'
          );
        }
      }
    }
  }

  private static decoratedLogs: any = {};

  public static prints(message: any, level?: LogLevel, type?: string);
  public static prints(message: any, level?: LogLevel, type?: DebugType);
  public static prints(message: any, level?: LogLevel, type?: RegExp);
  public static prints(message: any, level: LogLevel = 'log', type: any = '*') {
    return (target, key: string, desc: PropertyDescriptor) => {
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
