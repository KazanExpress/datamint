import { IDriverConstructor } from '../drivers';
import { ApiMap } from './apiMap';
import { Connection as connection, IRepositoryMap, RepoStore } from './connection';

export const Connection = connection as {
  /**
   * Creates a WebORM connection instance.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current entity structure.
   */
  new <T extends IRepositoryMap>(
      name: string,
      drivers: IDriverConstructor[],
      repositories: T,
      apiMap?: ApiMap<RepoStore<T>>
  ): connection<T> & RepoStore<T>;
} & typeof connection;

export type Connection<T extends IRepositoryMap = any> = connection<T>;

export * from './namespace';

