import { Connection } from '../connection/connection';
import { IStorableConstructor } from '../storable';
import { DataMap, IRepoFactoryOptions, RepoFactory, Repository } from './base';

export class RemoteRepositoryClass<
  DM extends DataMap<C>,
  C extends IStorableConstructor<any>
> extends Repository<DM, C> {
  public get API() {
    return this.api!;
  }
}

export function RemoteRepository<
  C extends IStorableConstructor<any>,
  D extends DataMap<C>
>(options: IRepoFactoryOptions<C, D>): RepoFactory<RemoteRepositoryClass<D, C>> {
  return (name: string, connection: Connection) => new RemoteRepositoryClass<D, C>(
    name,
    connection.name,
    options.model,
    options.api
  );
}
