import { DebugType, print, errorTypeFor, LogLevel } from './module';

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
  public get debugEnabled() { return errorTypeFor(this.debugType); }

  private readonly logFactory = (level: LogLevel) => message => print(this.connectionName, this.debugType, message, level);

  protected log = this.logFactory('log');
  protected warn = this.logFactory('warn');
  protected error = this.logFactory('error');
  protected debug = this.logFactory('debug');
}
