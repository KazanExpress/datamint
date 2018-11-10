import { Repository } from './base';
import { Entity, IStorable, IStorableConstructor } from '../storable';
import { Connection } from '../orm/connection';
import { QueryResult } from '../queryResult';
import { Key } from '../util';
declare type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
    [key in IDKey]: ID;
};
export declare class EntityRepository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, ID = E extends Entity<string, infer IdType> ? IdType : any, IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<C, E> {
    readonly columns: Array<string>;
    readonly primaryKey: string | number;
    constructor(name: string, connection: Connection<any>, entity: C);
    add(options: A): QueryResult<E>;
    get(id: ID): QueryResult<E>;
    update(options: PartialWithId<A, ID, IDKey>): QueryResult<E>;
    updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E>;
    delete(id: ID): QueryResult<E>;
}
export {};
