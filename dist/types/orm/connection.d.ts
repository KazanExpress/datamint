import { Repository } from '../repository';
import { Driver, IDriverConstructor } from '../drivers';
import { IStorableConstructor } from '../storable';
import { DebugType, ExceptionType } from '../debug';
export interface IRepositoryMap {
    [name: string]: IStorableConstructor<any>;
}
export declare type RepoStore<M extends IRepositoryMap> = {
    [name in keyof M]: Repository<M[name]>;
};
export declare class Connection<T extends IRepositoryMap> {
    connectionName: string;
    drivers: IDriverConstructor[];
    private apiMap?;
    /**
     * The driver currently used for operations with entities
     */
    currentDriver: Driver;
    /**
     * A current map of bound repositories
     */
    repositories: RepoStore<T>;
    /**
     * Creates a WebORM connection instance.
     * @param connectionName the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current entity structure
     */
    constructor(connectionName: string, drivers: IDriverConstructor[], repositories: T, apiMap?: any);
    /**
     * Enable a certain debug option for WebORM
     *
     * Allows for detailed debug type - exception type mapping.
     */
    static debug(enabled: boolean): void;
    static debug(type: DebugType): void;
    static debug(type: DebugType, exceptions: ExceptionType): void;
    static debug(type: string): void;
    static debug(type: string, exceptions: ExceptionType): void;
}
