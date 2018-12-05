import { Debugable } from './debugable';
import { debugMap, debugState, DebugType } from './module';

class GlobalDebug extends Debugable {
  protected $debugType: DebugType = '*';
  protected $connectionName: string = '';
  private constructor() { super(); }

  public static readonly instance = new GlobalDebug();

  public $log!: Debugable['$log'];
  public $warn!: Debugable['$warn'];
  public $error!: Debugable['$error'];
  public $debug!: Debugable['$debug'];

  public get map() {
    return debugMap;
  }

  public get state() {
    return debugState;
  }
}

export const Debug = GlobalDebug.instance;

export * from './debugable';
export * from './module';

