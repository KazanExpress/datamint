import { ApiMap, RepoFromDataMap } from '../apiMap';
import { Debug, Debugable, debugMap, DebugState, debugState, DebugType, ExceptionType, setDebugState } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { FallbackDriver } from '../drivers/fallback';
import { MultiDriver } from '../drivers/multiDriver';
import { makeRepository } from '../repository';
import { IStorableConstructor } from '../storable';

export interface IRepositoryMap {
  [name: string]: IStorableConstructor<any>;
}

type PropFrom<O, Key> = Key extends keyof O ? O[Key] : any;

export type RepoStore<M extends IRepositoryMap, A extends ApiMap<M>> = {
  [Name in (keyof M | keyof A)]: RepoFromDataMap<PropFrom<M, Name>, PropFrom<A, Name>>;
};

export class Connection<
  RM extends IRepositoryMap = IRepositoryMap,
  AM extends ApiMap<RM> = ApiMap<RM>,
> extends Debugable {
  protected $debugType: DebugType = `connection`;
  protected $connectionName: string = this.name;

  // TODO
  // public static readonly plugins: WEBALORM.IPlugin[] = [];

  /**
   * The driver currently used for operations with entities
   */
  public currentDriver: Driver;

  /**
   * A current map of bound repositories
   */
  public repositories: RepoStore<RM, AM> = {} as any;

  /**
   * Creates a WEBALORM connection instance.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current data structure
   */
  constructor(
    public name: string,
    public drivers: IDriverConstructor[] | MultiDriver,
    repositories: RM,
    public readonly apiMap?: AM
  ) {
    super();

    if (!apiMap) {
      Debug.$warn('The main webalorm functionality is disabled. Are you sure you want to use this without API?', true);
    }

    try {
      if (Array.isArray(drivers)) {
        // Select the first supported driver from the bunch
        const SupportedDrivers = drivers.filter(d => d.isSupported);
        if (SupportedDrivers.length > 0) {
          this.currentDriver = new SupportedDrivers[0](this);
        } else {
          throw new TypeError('No supported driver provided. Using fallback.');
        }
      } else if (drivers instanceof MultiDriver) {
        this.currentDriver = drivers;
      } else {
        throw new TypeError('No supported driver provided. Using fallback.');
      }

      this.$log(`Using driver "${this.currentDriver.constructor.name}"`);
    } catch (e) {
      this.$error(e.message, true);

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
        apiMap: this.apiMap && this.apiMap[name] as any,
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
   * Enable a certain debug option for WEBALORM
   */
  public static $debug(type: DebugType): void;
  /**
   * Enable a certain debug option for WEBALORM
   *
   * Allows specifying different debug types:
   *
   * - `soft` - informative, only logs to console
   * - `hard` - throws exceptions, forcing proper error-handling
   */
  public static $debug(type: DebugType, exceptions: ExceptionType): void;
  /**
   * Enable a certain debug option for WEBALORM
   */
  public static $debug(type: string): void;
  /**
   * Enable a certain debug option for WEBALORM
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
