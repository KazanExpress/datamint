import { Connection } from '../connection';
import { Debugable, DebugType } from '../debug';
import { IRepoData } from '../repository';

export interface IDriverConstructor extends Function {
  new (connection: Connection): Driver;

  readonly isSupported: boolean;
}

export abstract class Driver extends Debugable {
  protected readonly debugType: DebugType = 'driver';
  public readonly connectionName: string = this.connection.name;

  constructor(
    protected connection: Connection
  ) { super(); }

  /* TODO: additional driver functionality?.. */


  public abstract create<A extends object, R extends IRepoData>(
    repository: R,
    data: A
  ): Promise<A>;

  public abstract findById<A extends object, R extends IRepoData, ID extends PropertyKey>(
    repository: R,
    id: ID
  ): Promise<A | undefined>;

  public abstract update<A extends object, R extends IRepoData>(
    repository: R,
    data: Partial<A>
  ): Promise<Array<A>>;

  public abstract updateOne<A extends object, R extends IRepoData, ID extends PropertyKey>(
    repository: R,
    id: ID,
    query: ((entity: A) => Partial<A>) | Partial<A>
  ): Promise<A | undefined>;

  public abstract delete<A extends object, R extends IRepoData>(
    repository: R,
    data: Partial<A>
  ): Promise<Array<A>>;

  public abstract deleteOne<A extends object, R extends IRepoData, ID extends PropertyKey>(
    repository: R,
    id: ID
  ): Promise<A | undefined>;

  /**
   * Determines if the driver is supported in current environment
   */
  static get isSupported(): boolean {
    throw new Error('Not implemented.');
  }
}
