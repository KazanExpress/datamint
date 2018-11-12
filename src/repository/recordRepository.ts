import { DataMap } from '../drivers/api';
import { QueryResult } from '../queryResult';
import { IStorableConstructor, Storable } from '../storable';
import { Repository } from './base';

/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
export class RecordRepository<
  DM extends DataMap<E>,
  C extends IStorableConstructor<E>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Repository<DM, C, E, A> {
  public create(options: A): QueryResult<E> {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      new this.Data(options, this)
    );
  }

  public update(options: Partial<A>): QueryResult<E> {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      new this.Data(options, this)
    );
  }

  public read(): QueryResult<E> {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      new this.Data({}, this)
    );
  }

  public delete(): QueryResult<E> {
    throw new Error('Not implemented');

    return new QueryResult(/* TODO: implement this */
      true,
      new this.Data({}, this)
    );
  }
}
