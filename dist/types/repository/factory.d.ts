import { IStorableConstructor, IStorable } from '../storable';
import { Connection } from '../orm/connection';
import { Repository } from './base';
export declare function makeRepository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>>(name: string, connection: Connection<any>, data: C): Repository<C, E>;
