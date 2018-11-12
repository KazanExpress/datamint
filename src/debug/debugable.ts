import { DebugType, errorTypeFor, LogLevel, print } from './module';

export abstract class Debugable {
  /**
   * The debug type for this class' actions
   */
  protected readonly abstract $debugType: DebugType;

  /**
   * The name of the WebRM connection this class uses
   */
  protected readonly abstract $connectionName: string;

  /**
   * `true` if the debug is enabled for this class
   */
  public get $debugEnabled() { return errorTypeFor(this.$debugType); }

  protected readonly $logFactory = (level: LogLevel) => (message, force: boolean = false) => {
    if (this.$debugEnabled || force) {
      print(this.$connectionName, this.$debugType, message, level);
    }
  };

  protected readonly $log = this.$logFactory('log');
  protected readonly $warn = this.$logFactory('warn');
  protected readonly $error = this.$logFactory('error');
  protected readonly $debug = this.$logFactory('debug');
}
