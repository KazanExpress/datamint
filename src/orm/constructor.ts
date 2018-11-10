import { Repository } from '../repository';
import { Driver, IDriverConstructor } from '../drivers';
import { FallbackDriver } from '../drivers/fallback';
import { IStorableConstructor } from '../storable';
import { Debug } from '../debug';
import { DebugType, ExceptionType } from '../debug/types';

export interface IRepositoryMap {
  [name: string]: IStorableConstructor<any>;
}

export type RepoStore<M extends IRepositoryMap> = {
  [name in keyof M]: Repository<
  M[name]
  >;
};

export class Connection<T extends IRepositoryMap> {
  // TODO
  // public static readonly plugins: WebORM.IPlugin[] = [];

  /**
   * The driver currently used for operations with entities
   */
  public currentDriver: Driver;

  /**
   * A current map of bound repositories
   */
  public repositories: RepoStore<T> = {} as any;

  /**
   * Creates an instance of WebOrm.
   * @param connectionName the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current entity structure
   */
  constructor(
    public connectionName: string,
    public drivers: IDriverConstructor[],
    repositories: T,
    private apiMap?: any // TODO
  ) {
    // Select the first supported driver from the bunch
    const SupportedDriver = drivers.find(d => d.isSupported);

    if (SupportedDriver) {
      // TODO: multi-driver mode
      Debug.log(
        this.connectionName,
        'orm',
        `Using driver "${SupportedDriver.name}" as the first supported driver`
      );

      this.currentDriver = new SupportedDriver(this);
    } else {
      Debug.warn(
        this.connectionName,
        'orm',
        'No supported driver provided. Using fallback.'
      );

      this.currentDriver = new FallbackDriver(this);
    }

    let reProxy;

    if (!Proxy) {
      Debug.warn(
        this.connectionName,
        'orm',
        `window.Proxy is unavailable. Using insufficient property forwarding.`
      );

      reProxy = (repoName: string) => Object.defineProperty(this, repoName, {
        get: () => this.repositories[repoName],
      });
    }

    for (const repoName in repositories) {
      const entityConstructor = repositories[repoName];

      this.repositories[repoName] = new Repository(repoName, this, entityConstructor);

      reProxy && reProxy(repoName);
    }

    if (Proxy) {
      Debug.log(
        this.connectionName,
        'orm',
        `window.Proxy is available. Using modern property forwarding.`
      );

      return new Proxy(this, {
        get(target, key: string) {
          if (!target.repositories[key]) {
            if (!target[key]) {
              Debug.log(
                target.connectionName,
                'orm',
                `Repository "${key}" is not registered upon initialization. No other property with the same name was found.`
              );
            }

            return target[key];
          }

          return target.repositories[key];
        }
      });
    }
  }

  //#region Debug

  /**
   * Enable a certain debug option for WebORM
   *
   * Allows for detailed debug type - exception type mapping.
   */
  public static debug(enabled: boolean): void;
  public static debug(type: DebugType): void;
  public static debug(type: DebugType, exceptions: ExceptionType): void;
  public static debug(type: string): void;
  public static debug(type: string, exceptions: ExceptionType): void;
  public static debug(type: boolean | string, exceptions?: ExceptionType) {
    if (typeof type === 'boolean') {
      Debug.state = (type ? 'enabled' : 'disabled');
    } else {
      Debug.state = ('custom');

      Debug.map[type] = exceptions || !Debug.map[type];
    }
  }

  //#endregion
}
