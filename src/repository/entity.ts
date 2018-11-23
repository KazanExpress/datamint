import { EntityDataMap } from '../apiMap';
import { QueryResult } from '../queryResult';
import { Entity, IStorableConstructor } from '../storable';
import { FromSecArg, IRepoConnection, IRepoData, Repository } from './base';

type PartialWithId<T, ID, IDKey extends PropertyKey> = Partial<T> & {
  [key in IDKey]: ID;
};

export interface IEntityRepoData<IDKey extends PropertyKey> extends IRepoData {
  readonly columns: Array<string>;
  readonly primaryKey: IDKey;
}

export interface IEntityRepoMethods<
  C extends IStorableConstructor<E>,
  E extends Entity = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  ID = E extends Entity<string, infer IdType> ? IdType : any,
  IDKey extends PropertyKey = E extends Entity<infer IdKey, unknown> ? IdKey : string,
> {
  add(
    options: A,
    apiOptions?: any
  ): Promise<any>;

  get(
    id: ID,
    apiOptions?: any
  ): Promise<any>;

  update(
    entity: PartialWithId<A, ID, IDKey> | ID,
    deleteApiOptions?: any
  ): Promise<any>;

  delete(
    entity: PartialWithId<A, ID, IDKey> | ID,
    deleteApiOptions?: any
  ): Promise<any>;

  //...
  // TODO - other methods
}

/**
 * A typical multi-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 * @template `ID` entity primary key type
 * @template `IDKey` entity primary key name
 */
export class EntityRepository<
  DM extends EntityDataMap<C>,
  C extends IStorableConstructor<E>,
  E extends Entity = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  ID = E extends Entity<string, infer IdType> ? IdType : any,
  IDKey extends PropertyKey = E extends Entity<infer IdKey, unknown> ? IdKey : string,
> extends Repository<DM, C, E, A> implements IEntityRepoData<IDKey>, IEntityRepoMethods<C, E, A, ID, IDKey> {

  public readonly columns: Array<string> = [];
  public readonly primaryKey: IDKey;

  constructor(
    name: string,
    connection: IRepoConnection<DM>,
    entity: C
  ) {
    super(name, connection, entity);
    this.primaryKey = entity.prototype.__idCol__;
    delete entity.prototype.__idCol__;

    if (entity.prototype.__col__) {
      this.columns = entity.prototype.__col__;
      delete entity.prototype.__col__;
    } else {
      this.columns = Object.keys(new entity({}, this));
    }
  }

  private get driverOptions(): IEntityRepoData<IDKey> {
    return {
      name: this.name,
      columns: this.columns,
      primaryKey: this.primaryKey
    };
  }

  public async add(
    options: A,
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions?: FromSecArg<DM['add']> | false // Pass false to disable the api call
  ) {
    try {
      const result = await this.connection.currentDriver.create<A, IEntityRepoData<IDKey>>(this.driverOptions, options);

      const instance = this.makeDataInstance(result);

      // Call local driver changes synchronously
      const queryResult = new QueryResult(true, instance);

      // Call api driver asynchronously
      if (this.api && this.api.add && apiOptions !== false) {
        this.$log(`API handler execution start: ${this.name}.add()`);

        // @TODO: implement async request queue
        this.api.add(options, apiOptions).then(res => {
          queryResult.result = this.makeDataInstance(res);
          this.$log(`API handler execution end: ${this.name}.add() => ${JSON.stringify(res, undefined, '  ')}`);
        }).catch(e => {
          queryResult.error = e;
          this.$error(`API handler execution end: ${this.name}.add() => ${e}`);
        });
      } else {
        this.$log('No API handler called');
      }

      return queryResult;
    } catch (e) {
      this.$error(e);

      return new QueryResult<E>(false, this.makeDataInstance(options), e);
    }
  }

  public async get(
    id: ID,
    getApiOptions?: FromSecArg<DM['get']> | false
  ) {
    try {
      const result = await this.connection.currentDriver.read<A, IEntityRepoData<IDKey>>(this.driverOptions, id);

      const instance = this.makeDataInstance(result);

      // Call local driver changes synchronously
      const queryResult = new QueryResult(true, instance);

      // Call api driver asynchronously
      if (this.api && this.api.get && getApiOptions !== false) {
        this.$log(`API handler execution start: ${this.name}.get()`);

        // @TODO: implement async request queue
        this.api.get(id as any, getApiOptions).then(res => {
          queryResult.result = this.makeDataInstance(res);
          this.$log(`API handler execution end: ${this.name}.get() => ${JSON.stringify(res, undefined, '  ')}`);
        }).catch(e => {
          queryResult.error = e;
          this.$error(`API handler execution end: ${this.name}.get() => ${e}`);
        });
      } else {
        this.$log('No API handler called');
      }

      return queryResult;
    } catch (e) {
      return new QueryResult(
        false,
        undefined,
        e
      );
    }
  }

  public async update(
    entity: PartialWithId<A, ID, IDKey>,
    updateApiOptions?: FromSecArg<DM['update']>
  ) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance({} as any)
    );
  }

  /* Do we even need this?.. */
  public async updateById(
    id: ID,
    query: (entity: E) => Partial<A>,
    // updateApiOptions?: FromSecArg<DM['updateById']>
  ) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance(query({} as any) as any)
    );
  }

  public async delete(
    entity: PartialWithId<A, ID, IDKey> | ID,
    deleteApiOptions?: FromSecArg<DM['delete']> | false
  ) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance({} as any)
    );
  }

  // TODO: Find, find by, exists, etc...

  public async count() {
    // TODO: count entities
  }

  // TODO: Cluster operations
}
