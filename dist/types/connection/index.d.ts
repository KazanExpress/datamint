import { Connection as connection, IRepositoryMap, RepoStore } from './connection';
export declare const Connection: (new <RM extends IRepositoryMap = IRepositoryMap>(name: string, repositories: RM) => connection<RM> & RepoStore<RM>) & typeof connection;
export declare type Connection<RM extends IRepositoryMap = any> = connection<RM>;
