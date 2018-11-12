import { DataMap } from '../drivers/api';
import { QueryResult } from '../queryResult';
import { Entity, IStorableConstructor, Storable } from '../storable';
import { Key } from '../util';
import { IRepoConnection, Repository, IRepoData } from './base';
declare type PartialWithId<T, ID, IDKey extends Key> = Partial<T> & {
    [key in IDKey]: ID;
};
declare type Arg<T extends undefined | ((arg: any) => any)> = T extends (arg: infer U) => any ? U : undefined;
export interface IEntityRepoData<IDKey extends string> extends IRepoData {
    readonly columns: Array<string>;
    readonly primaryKey: IDKey;
}
/**
 * A typical multi-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 * @template `ID` entity primary key type
 * @template `IDKey` entity primary key name
 */
export declare class EntityRepository<DM extends DataMap<C>, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], ID = E extends Entity<string, infer IdType> ? IdType : any, IDKey extends string = E extends Entity<infer IdKey, unknown> ? IdKey : string> extends Repository<DM, C, E, A> implements IEntityRepoData<IDKey> {
    readonly columns: Array<string>;
    readonly primaryKey: IDKey;
    constructor(name: string, connection: IRepoConnection, entity: C);
    private readonly driverOptions;
    add(options: A, apiOptions?: Arg<DM['create']>): Promise<QueryResult<E>>;
    get(id: ID, getApiOptions?: Arg<DM['read']>): QueryResult<E>;
    update(entity: PartialWithId<A, ID, IDKey>, updateApiOptions?: Arg<DM['update']>): QueryResult<E>;
    updateById(id: ID, query: (entity: E) => Partial<A>, updateApiOptions?: Arg<DM['update']>): QueryResult<E>;
    delete(entity: PartialWithId<A, ID, IDKey> | ID, deleteApiOptions?: Arg<DM['delete']>): QueryResult<E>;
    count(): void;
}
export {};
