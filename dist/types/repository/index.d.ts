import { QueryResult } from '../queryResult';
import { Connection } from '../orm';
import { IStorable, IStorableConstructor } from '../storable';
import { Entity } from '../storable/entity';
import { Key } from '../util';
/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */
declare type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
    [key in IDKey]: ID;
};
export interface IRepository {
    name: string;
    readonly connection: Connection;
    readonly columns: Array<string>;
    readonly primaryKey: Key;
}
export declare class Repository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, ID = E extends Entity<string, infer IdType> ? IdType : any, IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> implements IRepository {
    name: string;
    readonly connection: Connection;
    protected entity: C;
    readonly columns: Array<string>;
    readonly primaryKey: string | number;
    constructor(name: string, connection: Connection, entity: C);
    add(options: A): QueryResult<E>;
    get(id: ID): QueryResult<E>;
    update(options: PartialWithId<A, ID, IDKey>): QueryResult<E>;
    updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E>;
    delete(id: ID): QueryResult<E>;
}
export {};
