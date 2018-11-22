import { DataMap } from '../apiMap';
import { Debug, Debugable, DebugType } from '../debug';
import { Driver } from '../drivers';
import { IStorableConstructor, Storable } from '../storable';

export interface IRepoConnectionInternal {
  name: string;
  currentDriver: Driver;
}

export interface IRepoConnection<DM> extends IRepoConnectionInternal {
  apiMap: DM;
}

export interface IRepoData {
  name: string;
}

export type FromSecArg<
  T extends undefined | ((arg: any, other: any) => any)
> = T extends ((arg: any, other: infer U) => any) ? U : undefined;

export abstract class Repository<
  DM extends DataMap<C> | undefined,
  C extends IStorableConstructor<E>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Debugable implements IRepoData {
  protected readonly $debugType: DebugType = `db:${this.name.toLowerCase()}` as DebugType;
  protected readonly connection: IRepoConnectionInternal;
  public readonly $connectionName: string;

  constructor(
    public name: string,
    connection: IRepoConnection<DM>,
    private Data: C
  ) {
    super();
    this.connection = connection;
    this.$connectionName = connection.name;

    this.api = connection.apiMap;

    if (/* this class was instantiated directly (without inheritance) */
      Repository.prototype === this.constructor.prototype
    ) {
      if (this.$debugEnabled) {
        this.$warn(`Using default empty repository.`);
      } else {
        Debug.$warn(`Using default empty repository for ${name}`, true);
      }
    }

  }

  protected readonly api: DM;

  protected makeDataInstance(options: A) {
    return new this.Data(options, this);
  }
}
