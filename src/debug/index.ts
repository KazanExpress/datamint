import { Debugable } from './debugable';
import { DebugType, debugMap, debugState } from './module';

class GlobalDebug extends Debugable {
  protected debugType: DebugType = '*';
  protected connectionName: string = '';
  private constructor() { super(); }

  public static instance = new GlobalDebug();

  public log = super.log;
  public warn = super.warn;
  public error = super.error;
  public debug = super.debug;

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
