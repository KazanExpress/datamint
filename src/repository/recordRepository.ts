import { QueryResult } from '../queryResult';
import { Storable, IStorableConstructor } from '../storable';
import { Repository } from './base';
import { DataMap } from '../drivers/api';

export class RecordRepository<
  DM extends DataMap<E>,
  C extends IStorableConstructor<E>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Repository<DM, C, E, A> {
  public create(options: A): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data(options, this)
    );
  }

  public update(options: Partial<A>): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data(options, this)
    );
  }

  public read(): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({}, this)
    );
  }

  public delete(): QueryResult<E> {
    return new QueryResult(
      true,
      new this.Data({}, this)
    );
  }
}
