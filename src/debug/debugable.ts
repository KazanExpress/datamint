import { Enumerable } from '../util';
import { DebugType, errorTypeFor, LogLevel, print } from './module';

export abstract class Debugable {
  /**
   * The debug type for this class' actions
   */
  @Enumerable(false)
  protected readonly abstract $debugType: DebugType;

  /**
   * The name of the WEBALORM connection this class uses
   */
  @Enumerable(false)
  protected readonly abstract $connectionName: string;

  /**
   * `true` if the debug is enabled for this class
   */
  @Enumerable(false)
  public get $debugEnabled() { return errorTypeFor(this.$debugType); }

  @Enumerable(false)
  protected readonly $logFactory = (level: LogLevel) => (message, force: boolean = false) => {
    if (this.$debugEnabled || force) {
      print(this.$connectionName, this.$debugType, message, level);
    }
  };

  @Enumerable(false)
  protected readonly $log = this.$logFactory('log');
  @Enumerable(false)
  protected readonly $warn = this.$logFactory('warn');
  @Enumerable(false)
  protected readonly $error = this.$logFactory('error');
  @Enumerable(false)
  protected readonly $debug = this.$logFactory('debug');
}
