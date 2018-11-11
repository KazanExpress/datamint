import { DebugType, ExceptionType } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { EntityRepository, Repository } from '../repository';
import { RecordRepository } from '../repository/recordRepository';
import { Entity, IStorableConstructor, Record } from '../storable';
import { ApiMap } from './apiMap';
export interface IRepositoryMap {
    [name: string]: IStorableConstructor<any>;
}
export declare type RepoStore<M extends IRepositoryMap> = {
    [name in keyof M]: InstanceType<M[name]> extends Entity ? EntityRepository<M[name]> : (InstanceType<M[name]> extends Record ? RecordRepository<M[name]> : Repository<M[name]>);
};
export declare class Connection<T extends IRepositoryMap> {
    name: string;
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
     * Creates a WebRM connection instance.
     * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
     * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
     * @param repositories sets the relation of a repository name to its contents' prototype.
     * @param apiMap maps the API calls onto the current entity structure
     */
    constructor(name: string, drivers: IDriverConstructor[], repositories: T, apiMap?: ApiMap<RepoStore<T>> | undefined);
    /**
     * Enable a certain debug option for WebRM
     *
     * Allows for detailed debug type - exception type mapping.
     */
    static debug(enabled: boolean): void;
    static debug(type: DebugType): void;
    static debug(type: DebugType, exceptions: ExceptionType): void;
    static debug(type: string): void;
    static debug(type: string, exceptions: ExceptionType): void;
}
