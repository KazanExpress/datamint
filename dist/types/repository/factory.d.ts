import { DataMap } from '../drivers/api';
import { Entity, IStorableConstructor, Record, Storable } from '../storable';
import { IRepoConnection, Repository } from './base';
import { EntityRepository } from './entityRepository';
import { RecordRepository } from './recordRepository';
export declare function makeRepository<DM extends DataMap<C>, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>>(name: string, connection: IRepoConnection, data: C): E extends Entity ? EntityRepository<DM, C, E> : E extends Record ? RecordRepository<DM, C, E> : Repository<DM, C, E>;
