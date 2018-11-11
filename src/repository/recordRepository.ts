import { DataMap } from '../apiMap';
import { QueryResult } from '../queryResult';
import { IStorable, IStorableConstructor } from '../storable';
import { Repository } from './base';

export class RecordRepository<
  DM extends DataMap<any>,
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Repository<DM, C, E, A> {
  public create(options: A): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data(options)
    );
  }

  public update(options: Partial<A>): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data(options)
    );
  }

  public read(): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({})
    );
  }

  public delete(): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({})
    );
  }
}
