import { Debugable } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { QueryResult } from '../queryResult';
import { Entity, IStorableConstructor } from '../storable';
import { FromSecArg, IRepoData, IRepoFactoryOptions, RepoFactory, Repository } from './base';
export declare type PartialWithId<T, IDValue, IDKey extends PropertyKey> = {
    [key in IDKey]: IDValue;
} & Partial<T>;
export interface IEntityRepoData<IDKey extends PropertyKey = PropertyKey> extends IRepoData {
    readonly primaryKey?: IDKey;
}
export interface IEntityRepoMethods<C extends IStorableConstructor<E>, E extends Entity = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], R = any, IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey, IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : any> {
    add(options: A, apiOptions?: any): Promise<R>;
    get(id: IDValue, apiOptions?: any): Promise<R>;
    update(entity: PartialWithId<A, IDValue, IDKey>, deleteApiOptions?: any): Promise<R>;
    updateById(id: IDValue, query: (entity: A) => Partial<A>, deleteApiOptions?: any): Promise<R>;
    delete(entity: Partial<A> | IDValue, deleteApiOptions?: any): Promise<R>;
}
export interface IEntityRepository<C extends IStorableConstructor<E>, E extends Entity = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey, IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : any> extends IEntityRepoData<IDKey>, IEntityRepoMethods<C, E, A, QueryResult<E> | QueryResult<undefined>, IDKey, IDValue>, Debugable {
}
export declare type EntityDataMap<C extends IStorableConstructor<E>, E extends Entity = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> = Partial<IEntityRepoMethods<C, E, A, A | undefined>>;
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
export declare class EntityRepositoryClass<DM extends EntityDataMap<C, E, A>, C extends IStorableConstructor<E>, E extends Entity = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey, IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : PropertyKey> extends Repository<DM, C, E, A> implements IEntityRepository<C, E, A, IDKey, IDValue> {
    readonly currentDriver: Driver;
    readonly primaryKey: IDKey;
    constructor(name: string, connectionName: string, currentDriver: Driver, entity: C, api?: DM);
    private readonly driverOptions;
    add(options: A, apiOptions?: FromSecArg<DM['add']> | false): Promise<QueryResult<E>>;
    get(id: IDValue, getApiOptions?: FromSecArg<DM['get']> | false): Promise<QueryResult<undefined> | QueryResult<E>>;
    update(entity: PartialWithId<A, IDValue, IDKey>, updateApiOptions?: FromSecArg<DM['update']>): Promise<QueryResult<E>>;
    updateById(id: IDValue, query: (entity: A) => Partial<A>, updateApiOptions?: FromSecArg<DM['update']>): Promise<QueryResult<E>>;
    delete(entity: Partial<A> | IDValue, deleteApiOptions?: FromSecArg<DM['delete']> | false): Promise<QueryResult<E>>;
    count(): Promise<void>;
}
export declare function EntityRepository<D extends EntityDataMap<C, E, A>, C extends IStorableConstructor<any>, E extends Entity = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], IDKey extends PropertyKey = E extends Entity<infer IdKey, any> ? IdKey : PropertyKey, IDValue extends PropertyKey = E extends Entity<string, infer IdType> ? IdType : PropertyKey>(options: IRepoFactoryOptions<C, D> & {
    dirvers?: IDriverConstructor | IDriverConstructor[];
}): RepoFactory<EntityRepositoryClass<D, C, E, A, IDKey, IDValue>>;
