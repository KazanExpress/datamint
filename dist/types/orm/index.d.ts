import { IDriverConstructor } from '../drivers';
import { ApiMap } from '../drivers/api';
import { Connection as connection, IRepositoryMap, RepoStore } from './connection';
export declare const Connection: (new <RM extends IRepositoryMap = IRepositoryMap, AM extends ApiMap<RM> = ApiMap<RM>>(name: string, drivers: IDriverConstructor[], repositories: RM, apiMap?: AM | undefined) => connection<RM, AM> & RepoStore<RM, AM>) & typeof connection;
export declare type Connection<RM extends IRepositoryMap = any, AM extends ApiMap<RM> = any> = connection<RM, AM>;
export * from './namespace';
