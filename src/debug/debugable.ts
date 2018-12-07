import { enumerable } from '../decorators';
import { DebugType, errorTypeFor, LogLevel, print } from './module';

export abstract class Debugable {
  /**
   * The debug type for this class' actions
   */
  @enumerable(false)
  protected readonly abstract debugType: DebugType;

  /**
   * The name of the WEBALORM connection this class uses
   */
  @enumerable(false)
  public readonly abstract connectionName: string;

  /**
   * `true` if the debug is enabled for this class
   */
  @enumerable(false)
  public get isDebugEnabled() { return errorTypeFor(this.debugType); }

  @enumerable(false)
  private $logFactory(level: LogLevel) {
    return (message: any, force: boolean = false) =>
      print(this.connectionName, this.debugType, message, level, force);
  }

  @enumerable(false)
  protected readonly $log = this.$logFactory('log');
  @enumerable(false)
  protected readonly $warn = this.$logFactory('warn');
  @enumerable(false)
  protected readonly $error = this.$logFactory('error');
  @enumerable(false)
  protected readonly $debug = this.$logFactory('debug');
}

export class DebugInstance extends Debugable {
  constructor(
    protected readonly debugType: DebugType,
    public readonly connectionName: string
  ) { super(); }

  public $log!: Debugable['$log'];
  public $warn!: Debugable['$warn'];
  public $error!: Debugable['$error'];
  public $debug!: Debugable['$debug'];
}
