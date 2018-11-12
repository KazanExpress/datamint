import { Debug, Debugable, debugMap, DebugState, debugState, DebugType, ExceptionType, setDebugState } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { ApiDriver, ApiMap, DataMap } from '../drivers/api';
import { FallbackDriver } from '../drivers/fallback';
import { EntityRepository, makeRepository, RecordRepository, Repository } from '../repository';
import { Entity, IStorableConstructor, Record } from '../storable';

export interface IRepositoryMap {
  [name: string]: IStorableConstructor<any>;
}

export type RepoFromConstructor<
  S extends IStorableConstructor<any>,
  D extends DataMap<any> = any
> = InstanceType<S> extends Entity ? EntityRepository<D, S>
  : (InstanceType<S> extends Record ? RecordRepository<D, S> : Repository<D, S>);

type PropFrom<O, Key> = Key extends keyof O ? O[Key] : any;

export type RepoStore<M extends IRepositoryMap, A extends ApiMap<any>> = {
  [Name in (keyof M | keyof A)]: RepoFromConstructor<PropFrom<M, Name>, PropFrom<A, Name>>;
};

export class Connection<
  RM extends IRepositoryMap = IRepositoryMap,
  AM extends ApiMap<RM> = ApiMap<RM>,
> extends Debugable {
  protected $debugType: DebugType = `connection`;
  protected $connectionName: string = this.name;

  // TODO
  // public static readonly plugins: WebRM.IPlugin[] = [];

  /**
   * The driver currently used for operations with entities
   */
  public currentDriver: Driver;

  /**
   * The driver currently used for operations with api requests
   */
  public apiDriver?: ApiDriver;

  /**
   * A current map of bound repositories
   */
  public repositories: RepoStore<RM, AM> = {} as any;

  /**
   * Creates a WebRM connection instance.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current data structure
   */
  constructor(
    public name: string,
    public drivers: IDriverConstructor[],
    repositories: RM,
    public readonly apiMap?: AM
  ) {
    super();

    if (apiMap) {
      this.apiDriver = new ApiDriver(this, apiMap);
    } else {
      Debug.$warn('The main webrm functionality is disabled. Are you sure you want to use this without API?', true);
    }

    // Select the first supported driver from the bunch
    const SupportedDriver = drivers.find(d => d.isSupported);

    if (SupportedDriver) {
      // TODO: multi-driver mode
      this.$log(`Using driver "${SupportedDriver.name}" as the first supported driver`);

      this.currentDriver = new SupportedDriver(this);
    } else {
      this.$warn('No supported driver provided. Using fallback.');

      this.currentDriver = new FallbackDriver(this);
    }

    let reProxy;

    if (!Proxy) {
      this.$warn(`window.Proxy is unavailable. Using insufficient property forwarding.`);

      reProxy = (repoName: string) => Object.defineProperty(this, repoName, {
        get: () => this.repositories[repoName],
      });
    }

    for (const repoName in repositories) {
      const name: string = repoName;
      const entityConstructor = repositories[name];

      this.repositories[name] = makeRepository(name, {
        name: this.name,
        apiDriver: this.apiMap && this.apiMap[name] && this.apiDriver,
        currentDriver: this.currentDriver,
      }, entityConstructor);

      reProxy && reProxy(name);
    }

    if (Proxy) {
      this.$log(`window.Proxy is available. Using modern property forwarding.`);

      return new Proxy(this, {
        get(target, key: string) {
          if (!target.repositories[key]) {
            if (!target[key]) {
              target.$log(
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
   * Enable a certain debug option for WebRM
   */
  public static $debug(type: DebugType): void;
  /**
   * Enable a certain debug option for WebRM
   *
   * Allows specifying different debug types:
   *
   * - `soft` - informative, only logs to console
   * - `hard` - throws exceptions, forcing proper error-handling
   */
  public static $debug(type: DebugType, exceptions: ExceptionType): void;
  /**
   * Enable a certain debug option for WebRM
   */
  public static $debug(type: string): void;
  /**
   * Enable a certain debug option for WebRM
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
