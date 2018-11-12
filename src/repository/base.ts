import { Debug, Debugable, DebugType } from '../debug';
import { Driver } from '../drivers';
import { ApiDriver, DataMap } from '../drivers/api';
import { IStorableConstructor, Storable } from '../storable';

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
  protected readonly $debugType: DebugType = `db:${this.name}` as DebugType;
  protected readonly connection: IRepoConnectionInternal;
  public readonly $connectionName: string = this.connection.name;

  constructor(
    public name: string,
    connection: IRepoConnection,
    protected Data: C
  ) {
    super();
    if (/* this class was instantiated directly (without inheritance) */
      Repository.prototype === this.constructor.prototype
    ) {
      if (this.$debugEnabled) {
        this.$warn(`Using default empty repository.`);
      } else if (Debug.map.db) {
        this.$warn(`Using default empty repository for ${name}`, true);
      }
    }

    this.connection = connection;

    this.api = connection.apiDriver;
  }

  public readonly api?: ApiDriver;
}
