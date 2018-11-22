import { EntityDataMap, RecordDataMap } from '../apiMap';
import { Entity, IStorableConstructor, Record, Storable } from '../storable';
import { IRepoConnection } from './base';
import { BrokenRepository } from './default';
import { EntityRepository } from './entity';
import { RecordRepository } from './record';
export declare function makeRepository<DM extends EntityDataMap<C, A> | RecordDataMap<C, A>, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]>(name: string, connection: IRepoConnection<DM>, data: C): DM extends EntityDataMap<C> ? (E extends Entity ? EntityRepository<DM, C, E, A> : BrokenRepository<DM>) : DM extends RecordDataMap<C> ? (E extends Record ? RecordRepository<DM, C, E, A> : BrokenRepository<DM>) : BrokenRepository<DM>;
