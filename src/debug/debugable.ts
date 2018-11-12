import { DebugType, print, errorTypeFor } from './module';

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

  protected error(message: any);
  protected error(message: any);
  protected error(message: any);
  protected error(message: any) {
    return print(
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
    return print(
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
    return print(
      this.connectionName,
      this.debugType,
      message,
      'warn'
    );
  }
}
