import { ApiMap, RepoFromDataMap } from '../apiMap';
import { Debugable, DebugState, DebugType, ExceptionType } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { MultiDriver } from '../drivers/multiDriver';
import { IStorableConstructor } from '../storable';
export interface IRepositoryMap {
    [name: string]: IStorableConstructor<any>;
}
declare type PropFrom<O, Key> = Key extends keyof O ? O[Key] : any;
export declare type RepoStore<M extends IRepositoryMap, A extends ApiMap<M>> = {
    [Name in (keyof M | keyof A)]: RepoFromDataMap<PropFrom<M, Name>, PropFrom<A, Name>>;
};
export declare class Connection<RM extends IRepositoryMap = IRepositoryMap, AM extends ApiMap<RM> = ApiMap<RM>> extends Debugable {
    name: string;
    drivers: IDriverConstructor[] | MultiDriver;
    readonly apiMap?: AM | undefined;
    protected $debugType: DebugType;
    protected $connectionName: string;
    /**
     * The driver currently used for operations with entities
     */
    currentDriver: Driver;
    /**
     * A current map of bound repositories
     */
    repositories: RepoStore<RM, AM>;
    /**
     * Creates a WEBALORM connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current data structure
     */
    constructor(name: string, drivers: IDriverConstructor[] | MultiDriver, repositories: RM, apiMap?: AM | undefined);
    /**
     * Returns a truthy value if debug is currently enabled
     *
     * Returns a falsy value if debug is currently disabled
     */
    static $debug(): DebugState;
    /**
     * Enable or disable all debug logs
     */
    static $debug(enabled: boolean): void;
    /**
     * Enable or disable all debug logs.
     *
     * Allows specifying different debug types:
     *
     * - `soft` - informative, only logs to console
     * - `hard` - throws exceptions, forcing proper error-handling
     */
    static $debug(enabled: boolean, exceptions: ExceptionType): void;
    /**
     * Enable a certain debug option for WEBALORM
     */
    static $debug(type: DebugType): void;
    /**
     * Enable a certain debug option for WEBALORM
     *
     * Allows specifying different debug types:
     *
     * - `soft` - informative, only logs to console
     * - `hard` - throws exceptions, forcing proper error-handling
     */
    static $debug(type: DebugType, exceptions: ExceptionType): void;
    /**
     * Enable a certain debug option for WEBALORM
     */
    static $debug(type: string): void;
    /**
     * Enable a certain debug option for WEBALORM
     *
     * Allows specifying different debug types:
     *
     * - `soft` - informative, only logs to console
     * - `hard` - throws exceptions, forcing proper error-handling
     */
    static $debug(type: string, exceptions: ExceptionType): void;
}
export {};
