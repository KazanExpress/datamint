import { DebugType, ExceptionType } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { EntityRepository, Repository } from '../repository';
import { RecordRepository } from '../repository/recordRepository';
import { Entity, IStorableConstructor, Record } from '../storable';
import { ApiMap, DataMap } from '../apiMap';
import { ApiDriver } from '../drivers/api';
export interface IRepositoryMap {
    [name: string]: IStorableConstructor<any>;
}
export declare type RepoFromConstructor<S extends IStorableConstructor<any>, D extends DataMap<any> = any> = InstanceType<S> extends Entity ? EntityRepository<D, S> : (InstanceType<S> extends Record ? RecordRepository<D, S> : Repository<D, S>);
export declare type RepoStore<M extends IRepositoryMap, A extends ApiMap<any>> = {
    [name in (keyof M | keyof A)]: RepoFromConstructor<name extends keyof M ? M[name] : any, name extends keyof A ? (A[name] extends DataMap<any> ? A[name] : any) : any>;
};
export declare class Connection<RM extends IRepositoryMap = IRepositoryMap, AM extends ApiMap<any> = ApiMap<RM>> {
    name: string;
    drivers: IDriverConstructor[];
    readonly apiMap?: AM | undefined;
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
