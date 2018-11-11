import { Connection } from '../orm/connection';
import { QueryResult } from '../queryResult';
import { Entity, IStorable, IStorableConstructor } from '../storable';
import { Key } from '../util';
import { Repository } from './base';
import { ApiDriver } from '../drivers/api';

type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
  [key in IDKey]: ID;
};

export class EntityRepository<
  // TODO: hide most of the generic params from end-user...
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  ID = E extends Entity<string, infer IdType> ? IdType : any,
  IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string,
> extends Repository<C, E, A> {
  public readonly columns: Array<string>;
  public readonly primaryKey: string | number;

  constructor(
    name: string,
    connection: Connection<any>,
    entity: C
  ) {
    super(name, connection, entity);
    this.primaryKey = entity.prototype.__id__;
    this.columns = Object.keys(entity.prototype.__col__);
    delete entity.prototype.__col__;
  }

  public async add(options: A, apiOptions: any) {
    const instance = new this.Data(options);

    const queryResult = new QueryResult(true, this.connection.currentDriver.create(this.name, instance));

    if (apiOptions && this.connection.apiDriver) {
      this.connection.apiDriver.create(this.name, apiOptions).then(res => {
        queryResult.result = Promise.resolve(res);
      });
    }

    return queryResult;
  }

  public get(id: ID): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({})
    );
  }

  public update(options: PartialWithId<A, ID, IDKey>): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({})
    );
  }

  public updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({})
    );
  }

  public delete(id: ID): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({})
    );
  }

  // TODO: Find, find by, etc...

  public count(data: Partial<A>) {
    // TODO: count entities
  }
}
