import { Debugable, debugMap, DebugState, debugState, DebugType, ExceptionType, setDebugState } from '../debug';
import { DataMap, RepoFactory, Repository } from '../repository/base';

export interface IRepositoryMap {
  [name: string]: RepoFactory<any>;
}

export type RepoStore<M extends IRepositoryMap> = {
  [Name in keyof M]: ReturnType<M[Name]>;
};

export class Connection<
  RM extends IRepositoryMap = IRepositoryMap,
> extends Debugable {
  protected debugType: DebugType = `connection`;

  /**
   * A current map of bound repositories
   */
  public readonly repositories: RepoStore<RM> = {} as any;

  [key: string]: any;

  /**
   * Creates a connection instance.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param repositories sets the relation of a repository name to its contents' options.
   */
  constructor(
    public readonly connectionName: string,
    repositories: RM,
  ) {
    super();

    let reProxy;

    if (!Proxy) {
      this.$warn(`Proxy is unavailable. Using insufficient property forwarding.`);

      reProxy = (repoName: string) => Object.defineProperty(this, repoName, {
        get: () => this.repositories[repoName],
      });
    }

    for (const repoName in repositories) {
      this.repositories[repoName] = repositories[repoName](repoName, this);

      reProxy && reProxy(repoName);
    }

    // Make repositories immutable
    this.repositories = Object.freeze(this.repositories);

    if (Proxy) {
      this.$log(`Proxy is available. Using modern property forwarding.`);

      return new Proxy(this, {
        get(target, key: string) {
          if (!target.repositories[key]) {
            if (typeof target[key] === 'undefined') {
              target.$warn(
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
   * Returns a truthy value if debug is currently enabled
   *
   * Returns a falsy value if debug is currently disabled
   */
  public static $debug(): DebugState;
  /**
   * Enable or disable all debug logs
   */
  public static $debug(enabled: boolean): void;
  /**
   * Enable or disable all debug logs.
   *
   * Allows specifying different debug types:
   *
   * - `soft` - informative, only logs to console
   * - `hard` - throws exceptions, forcing proper error-handling
   */
  public static $debug(enabled: boolean, exceptions: ExceptionType): void;
  /**
   * Enable a certain debug option for DATAMINT
   */
  public static $debug(type: DebugType): void;
  /**
   * Enable a certain debug option for DATAMINT
   *
   * Allows specifying different debug types:
   *
   * - `soft` - informative, only logs to console
   * - `hard` - throws exceptions, forcing proper error-handling
   */
  public static $debug(type: DebugType, exceptions: ExceptionType): void;
  /**
   * Enable a certain debug option for DATAMINT
   */
  public static $debug(type: string): void;
  /**
   * Enable a certain debug option for DATAMINT
   *
   * Allows specifying different debug types:
   *
   * - `soft` - informative, only logs to console
   * - `hard` - throws exceptions, forcing proper error-handling
   */
  public static $debug(type: string, exceptions: ExceptionType): void;
  public static $debug(type?: boolean | string, exceptions?: ExceptionType) {
    if (typeof type === 'undefined') {
      return debugState;
    }

    if (typeof type === 'boolean') {
      setDebugState(type ? 'enabled' : 'disabled');
      debugMap['*'] = exceptions || type;
    } else {
      setDebugState('custom');

      debugMap[type] = exceptions || !debugMap[type];
    }

    return;
  }

  //#endregion
}
