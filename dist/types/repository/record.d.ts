import { RecordDataMap } from '../apiMap';
import { QueryResult } from '../queryResult';
import { IStorableConstructor, Record } from '../storable';
import { Repository, FromSecArg } from './base';
/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
export declare class RecordRepository<DM extends RecordDataMap<C, A>, C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<DM, C, E, A> {
    create(options: A, apiOptions?: FromSecArg<DM['create']>): QueryResult<E>;
    update(options: Partial<A>, apiOptions?: FromSecArg<DM['update']>): QueryResult<E>;
    read(apiOptions?: FromSecArg<DM['read']>): QueryResult<E>;
    delete(apiOptions?: FromSecArg<DM['delete']>): QueryResult<E>;
}
