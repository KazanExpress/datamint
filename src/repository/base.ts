import { Debug } from '../debug';
import { Driver } from '../drivers';
import { ApiDriver, DataMap } from '../drivers/api';
import { IStorable, IStorableConstructor } from '../storable';

/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */

export interface IRepoConnection {
  name: string;
  currentDriver: Driver;
  apiDriver?: ApiDriver;
}

export class Repository<
  DM extends DataMap<E>,
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> {
  constructor(
    public name: string,
    protected readonly connection: IRepoConnection,
    protected Data: C
  ) {
    if (
      // If this class was instantiated directly (without inheritance)
      Repository.prototype === this.constructor.prototype

      // And debug for db:[name] is set
      && Debug.map[`db:${name}`]
    ) {
      Debug.warn(connection.name, `db:${name}`, `Using default empty repository for ${name}`);
    }
  }

  public readonly api?: ApiDriver = this.connection.apiDriver;

  public get hasApiMap() { return !!this.api; }
}
