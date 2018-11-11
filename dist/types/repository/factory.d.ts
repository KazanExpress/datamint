import { Driver } from '../drivers';
import { ApiDriver } from '../drivers/api';
import { Entity, IStorable, IStorableConstructor, Record } from '../storable';
import { Repository } from './base';
import { EntityRepository } from './entityRepository';
import { RecordRepository } from './recordRepository';
import { DataMap } from '../apiMap';
export declare function makeRepository<DM extends DataMap<any>, C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>>(name: string, connection: {
    name: string;
    currentDriver: Driver;
    apiDriver?: ApiDriver;
}, data: C): E extends Entity ? EntityRepository<DM, C, E> : E extends Record ? RecordRepository<DM, C, E> : Repository<DM, C, E>;
