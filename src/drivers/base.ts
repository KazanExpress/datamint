import { Connection } from '../orm';
import { EntityRepository, RecordRepository, IRepoData } from '../repository';

export interface IDriverConstructor extends Function {
  new (connection: Connection): Driver;

  readonly isSupported: boolean;
}

export abstract class Driver {
  constructor(
    protected connection: Connection
  ) {}

  public abstract create<A extends object, R extends IRepoData = IRepoData>(
    repository: R,
    data: A
  ): Promise<A>;

  public abstract read<A extends object, R extends IRepoData = IRepoData>(
    repository: R,
    id: any
  ): Promise<A>;

  public abstract update<A extends object, R extends IRepoData = IRepoData>(
    repository: R,
    id: any,
    query: (data: A) => Partial<A>
  ): Promise<A>;
  public abstract update<A extends object, R extends IRepoData = IRepoData>(
    repository: R,
    data: Partial<A>
  ): Promise<A>;

  public abstract delete<A extends object, R extends IRepoData = IRepoData>(
    repository: R,
    id: any
  ): Promise<A>;

  /**
   * Determines if the driver is supported in current environment
   */
  static get isSupported(): boolean {
    throw new Error('Not implemented.');
  }
}
