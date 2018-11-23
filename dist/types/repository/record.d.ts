import { RecordDataMap } from '../apiMap';
import { QueryResult } from '../queryResult';
import { IStorableConstructor, Record } from '../storable';
import { Repository, FromSecArg } from './base';
export interface IRecordRepoMethods<C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> {
    create(options: A, apiOptions?: any): Promise<any>;
    read(apiOptions?: any): Promise<any>;
    update(options: Partial<A>, apiOptions?: any): Promise<any>;
    delete(deleteApiOptions?: any): Promise<any>;
}
/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
export declare class RecordRepository<DM extends RecordDataMap<C>, C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<DM, C, E, A> implements IRecordRepoMethods<C, E, A> {
    create(options: A, apiOptions?: FromSecArg<DM['create']> | false): Promise<QueryResult<E>>;
    update(options: Partial<A>, apiOptions?: FromSecArg<DM['update']> | false): Promise<QueryResult<E>>;
    read(apiOptions?: FromSecArg<DM['read']> | false): Promise<QueryResult<E>>;
    delete(apiOptions?: FromSecArg<DM['delete']> | false): Promise<QueryResult<E>>;
}
