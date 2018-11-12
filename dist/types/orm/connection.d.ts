import { Debugable, DebugState, DebugType, ExceptionType } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { ApiDriver, ApiMap, DataMap } from '../drivers/api';
import { EntityRepository, Repository } from '../repository';
import { RecordRepository } from '../repository/recordRepository';
import { Entity, IStorableConstructor, Record } from '../storable';
export interface IRepositoryMap {
    [name: string]: IStorableConstructor<any>;
}
export declare type RepoFromConstructor<S extends IStorableConstructor<any>, D extends DataMap<any> = any> = InstanceType<S> extends Entity ? EntityRepository<D, S> : (InstanceType<S> extends Record ? RecordRepository<D, S> : Repository<D, S>);
declare type PropFrom<O, Key> = Key extends keyof O ? O[Key] : any;
export declare type RepoStore<M extends IRepositoryMap, A extends ApiMap<any>> = {
    [Name in (keyof M | keyof A)]: RepoFromConstructor<PropFrom<M, Name>, PropFrom<A, Name>>;
};
export declare class Connection<RM extends IRepositoryMap = IRepositoryMap, AM extends ApiMap<RM> = ApiMap<RM>> extends Debugable {
    name: string;
    drivers: IDriverConstructor[];
    readonly apiMap?: AM | undefined;
    protected debugType: DebugType;
    protected connectionName: string;
    /**
     * The driver currently used for operations with entities
     */
    currentDriver: Driver;
    /**
     * The driver currently used for operations with api requests
     */
    apiDriver?: ApiDriver;
    /**
     * A current map of bound repositories
     */
    repositories: RepoStore<RM, AM>;
    /**
     * Creates a WebRM connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current data structure
     */
    constructor(name: string, drivers: IDriverConstructor[], repositories: RM, apiMap?: AM | undefined);
    /**
     * Returns a truthy value if debug is currently enabled
     *
     * Returns a falsy value if debug is currently disabled
     */
    static debug(): DebugState;
    /**
     * Enable or disable all debug logs
     */
    static debug(enabled: boolean): void;
    /**
     * Enable or disable all debug logs.
     *
     * Allows specifying different debug types:
     *
     * - `soft` - informative, only logs to console
     * - `hard` - throws exceptions, forcing proper error-handling
     */
    static debug(enabled: boolean, exceptions: ExceptionType): void;
    /**
     * Enable a certain debug option for WebRM
     */
    static debug(type: DebugType): void;
    /**
     * Enable a certain debug option for WebRM
     *
     * Allows specifying different debug types:
     *
     * - `soft` - informative, only logs to console
     * - `hard` - throws exceptions, forcing proper error-handling
     */
    static debug(type: DebugType, exceptions: ExceptionType): void;
    /**
     * Enable a certain debug option for WebRM
     */
    static debug(type: string): void;
    /**
     * Enable a certain debug option for WebRM
     *
     * Allows specifying different debug types:
     *
     * - `soft` - informative, only logs to console
     * - `hard` - throws exceptions, forcing proper error-handling
     */
    static debug(type: string, exceptions: ExceptionType): void;
}
export {};
