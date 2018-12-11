import { enumerable } from '../decorators';
import { DebugType, errorTypeFor, LogLevel, getPrintFunction } from './module';

export abstract class Debugable {
  /**
   * The debug type for this class' actions
   */
  @enumerable(false)
  protected readonly abstract debugType: DebugType;

  /**
   * The name of the connection this class uses
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
    return getPrintFunction(this.connectionName, this.debugType, level);
  }

  @enumerable(false)
  protected get $log() { return this.$logFactory('log'); }
  @enumerable(false)
  protected get $warn() { return this.$logFactory('warn'); }
  @enumerable(false)
  protected get $error() { return this.$logFactory('error'); }
  @enumerable(false)
  protected get $debug() { return this.$logFactory('debug'); }
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
