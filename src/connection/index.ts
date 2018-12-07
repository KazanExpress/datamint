import { Connection as connection, IRepositoryMap, RepoStore } from './connection';

export const Connection = connection as {
  /**
   * Creates a connection instance.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   */
  new <
    RM extends IRepositoryMap = IRepositoryMap
  >(
      name: string,
      repositories: RM,
  ): connection<RM> & RepoStore<RM>;
} & typeof connection;

export type Connection<
  RM extends IRepositoryMap = any
> = connection<RM>;

