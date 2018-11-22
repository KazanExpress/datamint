import { EntityDataMap } from '../apiMap';
import { QueryResult } from '../queryResult';
import { Entity, IStorableConstructor } from '../storable';
import { IRepoConnection, IRepoData, Repository, FromSecArg } from './base';
declare type PartialWithId<T, ID, IDKey extends PropertyKey> = Partial<T> & {
    [key in IDKey]: ID;
};
export interface IEntityRepoData<IDKey extends PropertyKey> extends IRepoData {
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
export declare class EntityRepository<DM extends EntityDataMap<C, A>, C extends IStorableConstructor<E>, E extends Entity = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], ID = E extends Entity<string, infer IdType> ? IdType : any, IDKey extends PropertyKey = E extends Entity<infer IdKey, unknown> ? IdKey : string> extends Repository<DM, C, E, A> implements IEntityRepoData<IDKey> {
    readonly columns: Array<string>;
    readonly primaryKey: IDKey;
    constructor(name: string, connection: IRepoConnection<DM>, entity: C);
    private readonly driverOptions;
    add(options: A, apiOptions?: FromSecArg<DM['add']>): Promise<QueryResult<E>>;
    get(id: ID, getApiOptions?: FromSecArg<DM['get']>): QueryResult<E>;
    update(entity: PartialWithId<A, ID, IDKey>, updateApiOptions?: FromSecArg<DM['update']>): QueryResult<E>;
    updateById(id: ID, query: (entity: E) => Partial<A>): QueryResult<E>;
    delete(entity: PartialWithId<A, ID, IDKey> | ID, deleteApiOptions?: FromSecArg<DM['delete']>): QueryResult<E>;
    count(): void;
}
export {};
