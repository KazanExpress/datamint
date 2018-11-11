import { Connection } from '../orm';

export interface IDriverConstructor extends Function {
  new (connection: Connection): Driver;

  readonly isSupported: boolean;
}

export abstract class Driver {
  constructor(
    protected connection: Connection
  ) {}

  public abstract create<T extends object>(repositoryName: string, data: T): Promise<T>;
  public abstract read<T extends object>(repositoryName: string, id: any): Promise<T>;
  public abstract update<T extends object>(repositoryName: string, id: any, query: (data: T) => Partial<T>): Promise<T>;
  public abstract update<T extends object>(repositoryName: string, data: Partial<T>): Promise<T>;
  public abstract delete<T extends object>(repositoryName: string, id: any): Promise<T>;

  /**
   * Determines if the driver is supported in current environment
   */
  static get isSupported(): boolean {
    throw new Error('Not implemented.');
  }
}
