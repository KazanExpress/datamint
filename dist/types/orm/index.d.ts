import { IDriverConstructor } from '../drivers';
import { Connection as connection, IRepositoryMap, RepoStore } from './connection';
export declare const Connection: (new <T extends IRepositoryMap>(name: string, drivers: IDriverConstructor[], repositories: T, apiMap?: any) => connection<T> & RepoStore<T>) & typeof connection;
export declare type Connection<T extends IRepositoryMap = any> = connection<T>;
export * from './namespace';
