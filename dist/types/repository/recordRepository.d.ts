import { DataMap } from '../drivers/api';
import { QueryResult } from '../queryResult';
import { IStorableConstructor, Storable } from '../storable';
import { Repository } from './base';
export declare class RecordRepository<DM extends DataMap<E>, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<DM, C, E, A> {
    create(options: A): QueryResult<E>;
    update(options: Partial<A>): QueryResult<E>;
    read(): QueryResult<E>;
    delete(): QueryResult<E>;
}
