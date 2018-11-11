import { QueryResult } from '../queryResult';
import { IStorable, IStorableConstructor } from '../storable';
import { Repository } from './base';
import { DataMap } from '../apiMap';
export declare class RecordRepository<DM extends DataMap<any>, C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<DM, C, E, A> {
    create(options: A): QueryResult<E>;
    update(options: Partial<A>): QueryResult<E>;
    read(): QueryResult<E>;
    delete(): QueryResult<E>;
}
