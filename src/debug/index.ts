import { Debugable } from './debugable';
import { DebugType, debugMap, debugState } from './module';

export * from './debugable';
export * from './module';

class GlobalDebug extends Debugable {
  protected debugType: DebugType = '*';
  protected connectionName: string = '';
  private constructor() { super(); }

  public static instance = new GlobalDebug();

  public log(message) { super.log(message); }
  public warn(message) { super.warn(message); }
  public error(message) { super.error(message); }

  public get map() {
    return debugMap;
  }

  public get state() {
    return debugState;
  }
}

export const Debug = GlobalDebug.instance;
