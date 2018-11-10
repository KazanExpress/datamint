import { Repository } from './base';
import { Entity, IStorable, IStorableConstructor } from '../storable';
import { Connection } from '../orm/connection';
import { QueryResult } from '../queryResult';
import { Key } from '../util';

type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
  [key in IDKey]: ID;
};

export class EntityRepository<
  // TODO: hide most of the generic params from end-user...
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
  ID = E extends Entity<string, infer IdType> ? IdType : any,
  IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> extends Repository<C, E> {
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

  public add(options: A): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data(options))
    );
  }

  public get(id: ID): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data({}))
    );
  }

  public update(options: PartialWithId<A, ID, IDKey>): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data({}))
    );
  }

  public updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data({}))
    );
  }

  public delete(id: ID): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data({}))
    );
  }

  // TODO: Find, find by, etc...
}
