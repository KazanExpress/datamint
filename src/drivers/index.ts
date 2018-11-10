import { WebORM } from '../orm';

export interface IDriverConstructor extends Function {
  new (webOrmInstance: WebORM): Driver;

  readonly isSupported: boolean;
}

export abstract class Driver {
  protected orm: WebORM;

  constructor(webOrmInstance: WebORM) {
    this.orm = webOrmInstance;
  }

  public abstract create<T extends object>(repositoryName: string, entity: T): Promise<T>;
  public abstract read<T extends object>(repositoryName: string, id: any): Promise<T>;
  public abstract update<T extends object>(repositoryName: string, id: any, data: Partial<T>): Promise<T>;
  public abstract update<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;
  public abstract delete<T extends object>(repositoryName: string, id: any): Promise<T>;
  public abstract delete<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;

  /**
   * Determines if the driver is supported in current environment
   */
  static get isSupported(): boolean {
    throw new Error('Not implemented.');
  }
}
