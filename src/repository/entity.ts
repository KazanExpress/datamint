import { Connection } from '../connection/connection';
import { Debugable } from '../debug';
import { Driver, FallbackDriver, IDriverConstructor } from '../drivers';
import { QueryResult } from '../queryResult';
import { Entity, IStorableConstructor } from '../storable';
import { FromSecArg, IRepoData, IRepoFactoryOptions, RepoFactory, Repository, selectDriver } from './base';

export type PartialWithId<T, IDValue, IDKey extends PropertyKey> = {
  [key in IDKey]: IDValue;
} & Partial<T>;


export interface IEntityRepoData<IDKey extends PropertyKey = PropertyKey> extends IRepoData {
  readonly primaryKey?: IDKey;
}

export interface IEntityRepository<
  C extends IStorableConstructor<E>,
  E extends Entity = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey,
  IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : any
> extends IEntityRepoData<IDKey>, Debugable {
  add(
    options: A,
    apiOptions?: any
  ): Promise<any>;

  get(
    id: IDValue,
    apiOptions?: any
    ): Promise<any>;

  update(
    entity: PartialWithId<A, IDValue, IDKey>,
    deleteApiOptions?: any
  ): Promise<any>;

  updateById(
    id: IDValue,
    query: (entity: A) => Partial<A>,
    deleteApiOptions?: any
  ): Promise<any>;

  delete(
    entity: Partial<A> | IDValue,
    deleteApiOptions?: any
  ): Promise<any>;

  //...
  // TODO - other methods
}

export type EntityDataMap<
  C extends IStorableConstructor<E>,
  E extends Entity = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = Partial<IEntityRepository<C, E, A>>;

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
export class EntityRepositoryClass<
  DM extends EntityDataMap<C, E, A>,
  C extends IStorableConstructor<E>,
  E extends Entity = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey,
  IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : PropertyKey
> extends Repository<DM, C, E, A> implements IEntityRepository<C, E, A, IDKey, IDValue> {

  public readonly primaryKey: IDKey;

  constructor(
    name: string,
    connectionName: string,
    public readonly currentDriver: Driver,
    entity: C,
    api?: DM,
  ) {
    super(name, connectionName, entity, api);

    // If no unique ID is set for the entity
    if (!entity.prototype.__idKey__) {
      const falseInstance = new entity({}, this);
      const defaultIdAliases = [ 'id', 'ID', 'Id', '_id', '_ID', '_Id', '__id', '__ID', '__Id', '__id__', '__ID__', '__Id__' ];
      const key = Object.keys(falseInstance).find(key => defaultIdAliases.some(a => a === key));

      // Auto-apply the ID decorator if found any compatible property
      if (key) {
        Entity.ID(entity.prototype, key);
      } else {
        this.$error(`No ID field is set for "${entity.name}".`);
      }
    }

    this.primaryKey = entity.prototype.__idKey__;

    if (this.primaryKey && !this.columns.includes(String(this.primaryKey))) {
      this.columns.push(String(this.primaryKey));
    }

    delete entity.prototype.__idKey__;
  }

  private get driverOptions(): IEntityRepoData<IDKey> {
    return {
      name: this.name,
      columns: this.columns,
      primaryKey: this.primaryKey,
      connectionName: this.connectionName
    };
  }

  public async add(
    options: A,
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions?: FromSecArg<DM['add']> | false // Pass false to disable the api call
  ) {
    try {
      const result = await this.currentDriver.create<A, IEntityRepoData<IDKey>>(this.driverOptions, options);

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
    id: IDValue,
    getApiOptions?: FromSecArg<DM['get']> | false
  ) {
    try {
      const result = await this.currentDriver.findById<A, IEntityRepoData<IDKey>, IDValue>(this.driverOptions, id);

      if (!result) {
        throw new Error(`No results found for id ${id}`);
      }

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
    entity: PartialWithId<A, IDValue, IDKey>,
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
    id: IDValue,
    query: (entity: A) => Partial<A>,
    updateApiOptions?: FromSecArg<DM['update']>
  ) {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      this.makeDataInstance(query({} as any) as any)
    );
  }

  public async delete(
    entity: Partial<A> | IDValue,
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

export function EntityRepository<
  D extends EntityDataMap<C, E, A>,
  C extends IStorableConstructor<any>,
  E extends Entity = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey,
  IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : PropertyKey
>(options: IRepoFactoryOptions<C, D> & {
  dirvers?: IDriverConstructor | IDriverConstructor[];
}): RepoFactory<EntityRepositoryClass<D, C, E, A, IDKey, IDValue>> {
  return (name: string, connection: Connection) => new EntityRepositoryClass<D, C, E, A, IDKey, IDValue>(
    name,
    connection.name,
    new (selectDriver(options.dirvers || FallbackDriver, name))(connection),
    options.model,
    options.api
  );
}
