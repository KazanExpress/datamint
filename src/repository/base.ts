import { Debug, Debugable } from '../debug';
import { Driver } from '../drivers';
import { ApiDriver, DataMap } from '../drivers/api';
import { Storable, IStorableConstructor } from '../storable';

/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */

export interface IRepoConnectionInternal {
  name: string;
  currentDriver: Driver;
}

export interface IRepoConnection extends IRepoConnectionInternal{
  apiDriver?: ApiDriver;
}

export class Repository<
  DM extends DataMap<E>,
  C extends IStorableConstructor<E>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Debugable {
  protected readonly debugType = `db:${this.name}`;
  protected readonly connection: IRepoConnectionInternal;
  public readonly connectionName: string = this.connection.name;

  constructor(
    public name: string,
    connection: IRepoConnection,
    protected Data: C
  ) {
    super();
    if (// If this class was instantiated directly (without inheritance)
      Repository.prototype === this.constructor.prototype
    ) {
      if (Debug.map[`db:${name}`]) {
        Debug.warn(connection.name, `db:${name}`, `Using default empty repository.`);
      } else if (Debug.map.db) {
        Debug.warn(connection.name, `db:${name}`, `Using default empty repository for ${name}`);
      }
    }

    this.connection = connection;

    this.api = connection.apiDriver;
  }

  public readonly api?: ApiDriver;

}
