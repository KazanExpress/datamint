import { Repository } from './base';
import { IStorable, IStorableConstructor } from '../storable';
import { QueryResult } from '../queryResult';

export class RecordRepository<
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> extends Repository<C, E> {
  public create(options: A): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data(options))
    );
  }

  public update(options: Partial<A>): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data(options))
    );
  }

  public read(): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data({}))
    );
  }

  public delete(): QueryResult<E> {
    return new QueryResult(
      true,
      Promise.resolve(new this.Data({}))
    );
  }
}
