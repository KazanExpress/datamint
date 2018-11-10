import { QueryResult } from '../queryResult';
import { Connection } from '../orm';
import { IStorable, IStorableConstructor } from '../storable';
import { Entity } from '../storable/entity';
import { Key } from '../util';

/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */

type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
  [key in IDKey]: ID;
};

export interface IRepository {
  name: string;

  readonly connection: Connection;
  readonly columns: Array<string>;
  readonly primaryKey: Key;
}

export class Repository<
  // TODO: hide most of the generic params from end-user...
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
  ID = E extends Entity<string, infer IdType> ? IdType : any,
  IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> implements IRepository {
  public readonly columns: Array<string>;
  public readonly primaryKey: string | number;
  
  constructor(
    public name: string,
    public readonly connection: Connection,
    protected entity: C
  ) {
    this.primaryKey = entity.prototype.__id__;
    this.columns = Object.keys(entity.prototype.__col__);
    delete entity.prototype.__col__;
  }

  public add(options: A): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.entity(options))
    );
  }
  
  public get(id: ID): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.entity({}))
    );
  }

  public update(options: PartialWithId<A, ID, IDKey>): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.entity({}))
    );
  }
  
  public updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.entity({}))
    );
  }
  
  public delete(id: ID): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.entity({}))
    );
  }

  // TODO: Find, find by, etc...
}

