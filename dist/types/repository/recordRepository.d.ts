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
export declare class RecordRepository<DM extends DataMap<C>, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<DM, C, E, A> {
    create(options: A): QueryResult<E>;
    update(options: Partial<A>): QueryResult<E>;
    read(): QueryResult<E>;
    delete(): QueryResult<E>;
}
