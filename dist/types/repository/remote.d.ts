import { IStorableConstructor } from '../storable';
import { DataMap, IRepoFactoryOptions, RepoFactory, Repository } from './base';
export declare class RemoteRepositoryClass<DM extends DataMap<C>, C extends IStorableConstructor<any>> extends Repository<DM, C> {
    readonly API: NonNullable<DM>;
}
export declare function RemoteRepository<C extends IStorableConstructor<any>, D extends DataMap<C>>(options: IRepoFactoryOptions<C, D>): RepoFactory<RemoteRepositoryClass<D, C>>;
