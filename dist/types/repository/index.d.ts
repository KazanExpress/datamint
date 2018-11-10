import { QueryResult } from '../queryResult';
import { Connection } from '../orm';
import { IStorable, IStorableConstructor } from '../storable';
import { Entity } from '../storable/entity';
/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */
export interface IRepository {
    name: string;
    readonly connection: Connection;
    readonly columns: Array<string>;
    readonly primaryKey: string | number | symbol;
}
export declare class Repository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, ID = E extends Entity<infer IdType> ? IdType : any, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> implements IRepository {
    name: string;
    readonly connection: Connection;
    protected entity: C;
    readonly columns: Array<string>;
    readonly primaryKey: string | number | symbol;
    constructor(name: string, connection: Connection, entity: C);
    add(options: A): QueryResult<E>;
    get(id: ID): QueryResult<E>;
    updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E>;
    delete(id: ID): QueryResult<E>;
}
