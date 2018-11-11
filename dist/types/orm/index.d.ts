import { IDriverConstructor } from '../drivers';
import { ApiMap } from '../apiMap';
import { Connection as connection, IRepositoryMap, RepoStore } from './connection';
export declare const Connection: (new <RM extends IRepositoryMap = IRepositoryMap, AM extends ApiMap<any> = ApiMap<RM>>(name: string, drivers: IDriverConstructor[], repositories: RM, apiMap?: AM | undefined) => connection<RM, AM> & RepoStore<RM, AM>) & typeof connection;
export declare type Connection<RM extends IRepositoryMap = any, AM extends ApiMap<any> = any> = connection<RM, AM>;
export * from './namespace';
