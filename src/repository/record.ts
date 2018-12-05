import { Driver, FallbackDriver, IDriverConstructor } from '../drivers';
import { Connection } from '../connection/connection';
import { QueryResult } from '../queryResult';
import { IStorableConstructor, Record } from '../storable';
import { FromSecArg, IRepoData, RepoFactory, IRepoFactoryOptions, Repository, selectDriver } from './base';

export interface IRecordRepoMethods<
  C extends IStorableConstructor<E>,
  E extends Record = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> {
  create(
    options: A,
    apiOptions?: any
  ): Promise<any>;

  read(
    apiOptions?: any
  ): Promise<any>;

  update(
    options: Partial<A>,
    apiOptions?: any
  ): Promise<any>;

  delete(
    deleteApiOptions?: any
  ): Promise<any>;

  //...
  // TODO - other methods?
}

export type RecordDataMap<
  C extends IStorableConstructor<E>,
  E extends Record = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = Partial<IRecordRepoMethods<C, E, A>>;

/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
export class RecordRepositoryClass<
  DM extends RecordDataMap<C, E, A>,
  C extends IStorableConstructor<E>,
  E extends Record = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Repository<DM, C, E, A> implements IRepoData<never>, IRecordRepoMethods<C, E ,A> {
  constructor(
    name: string,
    connectionName: string,
    public readonly currentDriver: Driver,
    record: C,
    api?: DM,
  ) {
    super(name, connectionName, record, api);
  }

  public async create(
    options: A,
    apiOptions?: FromSecArg<DM['create']> | false
  ) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance({} as any)
    );
  }

  public async update(
    options: Partial<A>,
    apiOptions?: FromSecArg<DM['update']> | false
  ) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance({} as any)
    );
  }

  public async read(apiOptions?: FromSecArg<DM['read']> | false) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance({} as any)
    );
  }

  public async delete(apiOptions?: FromSecArg<DM['delete']> | false) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance({} as any)
    );
  }
}


export function RecordRepository<
  D extends RecordDataMap<C>,
  C extends IStorableConstructor<any>,
  E extends Record = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
>(options: IRepoFactoryOptions<C, D> & {
  dirvers?: IDriverConstructor | IDriverConstructor[];
}): RepoFactory<RecordRepositoryClass<D, C, E, A>> {
  return (name: string, connection: Connection) => new RecordRepositoryClass<D, C, E, A>(
    name,
    connection.name,
    new (selectDriver(options.dirvers || FallbackDriver, name))(connection),
    options.model,
    options.api
  );
}
