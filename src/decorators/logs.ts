import { DebugType, LogLevel, print } from '../debug';

type MessageFactory = ((this: any, ...args: any[]) => string)
  | ((key: PropertyKey, value: any, newValue?: any) => string)
  | string;

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
export function prints(message: MessageFactory, level?: LogLevel, type?: string);
export function prints(message: MessageFactory, level?: LogLevel, type?: DebugType);
export function prints(message: MessageFactory, level?: LogLevel, type?: RegExp);
export function prints(messageHandler: any, level: LogLevel = 'log', type: any = '*', force: boolean = false) {
  return (target, key: PropertyKey, desc: PropertyDescriptor) => {
    const _print = function (this: any) {
      const p = _ => {
        let context: string = '';

        if (target.constructor && target.constructor.name) {
          context = `${target.constructor.name}:${String(key)}`;
        } else if (target.name) {
          context = `${target.name}:${String(key)}`;
        } else if (this.name) {
          context = `${this.name}:${String(key)}`;
        }

        print(context, type, _, level, force);
      };

      if (typeof messageHandler === 'function') {
        p(messageHandler.apply(this, arguments));
      } else {
        p(messageHandler);
      }
    };

    const assignDescValue = (d: PropertyDescriptor) => {
      let original = d.value;

      d.get = function () {
        _print.apply(this, [key, original]);

        return original;
      };

      d.set = function (v) {
        _print.apply(this, [key, original, v]);

        original = v;
      };
    };

    if (desc) {
      if (typeof desc.value === 'function') {
        let original = desc.value;

        desc.value = function () {
          _print.apply(this, arguments);

          return original.apply(this, arguments);
        };
      } else if (typeof desc.value !== 'undefined' || desc.set) {
        assignDescValue(desc);
      }
    } else {
      const d: PropertyDescriptor = {};

      if (d.get) {
        const original = d.get;

        d.get = function (this: any) {
          _print.apply(this);

          return original.apply(this);
        };
      } else {
        assignDescValue(d);
      }

      Reflect.deleteProperty(target, key);
      Reflect.defineProperty(target, key, d);
    }
  };
}
