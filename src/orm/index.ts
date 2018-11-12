import { IDriverConstructor } from '../drivers';
import { ApiMap } from '../drivers/api';
import { Connection as connection, IRepositoryMap, RepoStore } from './connection';

export const Connection = connection as {
  /**
   * Creates a WEBALORM connection instance.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current data structure.
   */
  new <
    RM extends IRepositoryMap = IRepositoryMap,
    AM extends ApiMap<RM> = ApiMap<RM>
  >(
      name: string,
      drivers: IDriverConstructor[],
      repositories: RM,
      apiMap?: AM
  ): connection<RM, AM> & RepoStore<RM, AM>;
} & typeof connection;

export type Connection<
RM extends IRepositoryMap = any,
AM extends ApiMap<RM> = any
> = connection<RM, AM>;

export * from './namespace';

