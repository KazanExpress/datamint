import { Debugable, DebugState, DebugType, ExceptionType } from '../debug';
import { RepoFactory } from '../repository/base';
export interface IRepositoryMap {
    [name: string]: RepoFactory<any>;
}
export declare type RepoStore<M extends IRepositoryMap> = {
    [Name in keyof M]: ReturnType<M[Name]>;
};
export declare class Connection<RM extends IRepositoryMap = IRepositoryMap> extends Debugable {
    readonly connectionName: string;
    protected debugType: DebugType;
    /**
     * A current map of bound repositories
     */
    readonly repositories: RepoStore<RM>;
    [key: string]: any;
    /**
     * Creates a connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param repositories sets the relation of a repository name to its contents' options.
     */
    constructor(connectionName: string, repositories: RM);
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
