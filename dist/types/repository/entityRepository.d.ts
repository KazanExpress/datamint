import { QueryResult } from '../queryResult';
import { Entity, IStorable, IStorableConstructor } from '../storable';
import { Key } from '../util';
import { Repository } from './base';
import { Driver } from '../drivers';
import { ApiDriver } from '../drivers/api';
import { DataMap } from '../apiMap';
declare type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
    [key in IDKey]: ID;
};
declare type Arg<T extends undefined | ((arg: any) => any)> = T extends (arg: infer U) => any ? U : undefined;
export declare class EntityRepository<DM extends DataMap<any>, C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], ID = E extends Entity<string, infer IdType> ? IdType : any, IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string> extends Repository<DM, C, E, A> {
    readonly columns: Array<string>;
    readonly primaryKey: string | number;
    constructor(name: string, connection: {
        name: string;
        currentDriver: Driver;
        apiDriver?: ApiDriver;
    }, entity: C);
    test?: DM;
    add(options: A, apiOptions?: Arg<DM['create']>): Promise<QueryResult<E>>;
    get(id: ID): QueryResult<E>;
    update(entity: PartialWithId<A, ID, IDKey>): QueryResult<E>;
    updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E>;
    delete(entity: PartialWithId<A, ID, IDKey> | ID): QueryResult<E>;
    count(): void;
}
export {};
