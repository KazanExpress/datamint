import { Debug, DebugType } from './module';

export abstract class Debugable {
  /**
   * The debug type for this class' actions
   */
  protected readonly abstract debugType: string | DebugType;

  /**
   * The name of the WebRM connection this class uses
   */
  public readonly abstract connectionName: string;

  /**
   * `true` if the debug is enabled for this class
   */
  public get debugEnabled() { return Debug.errorTypeFor(this.debugType); }

  protected log(message) {
    Debug.log(this.connectionName, this.debugType, message);
  }
  protected warn(message) {
    Debug.warn(this.connectionName, this.debugType, message);
  }
  protected error(message) {
    Debug.warn(this.connectionName, this.debugType, message);
  }
}
