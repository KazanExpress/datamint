import { QueryResult } from '../queryResult';
import { Connection } from '../orm';
import { IStorable, IStorableConstructor } from '../storable';
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
export declare class Repository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> implements IRepository {
    name: string;
    readonly connection: Connection;
    protected entity: C;
    readonly columns: Array<string>;
    readonly primaryKey: string | number | symbol;
    constructor(name: string, connection: Connection, entity: C);
    add(options: A): QueryResult<E>;
    get(id: any): QueryResult<E>;
    update(id: any, options: Partial<A>): QueryResult<E>;
    delete(id: any): QueryResult<E>;
}
