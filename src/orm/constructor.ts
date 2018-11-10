import * as WebORM from './namespace';
import { Constructor, Repository } from '../repository';
import { Driver, IDriverConstructor } from '../drivers';
import { log, warn } from './logs';
import { FallbackDriver } from '../drivers/fallback';

export interface IRepositoryMap {
  [name: string]: Constructor;
}

export type RepoStore<M extends IRepositoryMap> = {
  [name in keyof M]: Repository<
    M[name]
  >;
};


export class WebOrm<T extends IRepositoryMap> {
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
      log(
        this.connectionName,
        'orm',
        `Using driver "${SupportedDriver.name}" as the first supported driver`
      );

      this.currentDriver = new SupportedDriver(this);
    } else {
      warn(
        this.connectionName,
        'orm',
        'No supported driver provided. Using fallback.'
      );
      
      this.currentDriver = new FallbackDriver(this);
    }
    
    let reProxy;
    
    if (!Proxy) {
      warn(
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

      this.repositories[repoName] = new Repository(this, entityConstructor);

      reProxy && reProxy(repoName);
    }

    if (Proxy) {
      log(
        this.connectionName,
        'orm',
        `window.Proxy is available. Using modern property forwarding.`
      );

      return new Proxy(this, {
        get(target, key: string) {
          if (!target.repositories[key]) {
            if (!target[key]) {
              log(
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
   * Enable a certain debug option for WebORM.
   *
   * Allows for detailed debug type - exception type mapping.
   */
  public static debug(enabled: boolean): void;
  public static debug(type: WebORM.DebugType): void;
  public static debug(type: WebORM.DebugType, exceptions: WebORM.ExceptionType): void;
  public static debug(type: string): void;
  public static debug(type: string, exceptions: WebORM.ExceptionType): void;
  public static debug(type: boolean | string, exceptions?: WebORM.ExceptionType) {
    if (typeof type === 'boolean') {
      this.debugState = type ? 'enabled' : 'disabled';
    } else {
      this.debugState = 'custom';

      this.debugMap[type] = exceptions || !this.debugMap[type];
    }
  }

  /**
   * `true` if any debug is enabled
   */
  public static get DebugEnabled() { return this.debugState !== 'disabled'; }

  /**
   * Shows the current debug state of WebORM
   * 
   * - `enabled` - all the logs and exceptions are enabled
   * - `custom` - custom rules are set via a `debug()` function
   * - `disabled` - all the logs and most exceptions are suppressed
   */
  public static get DebugState() { return this.debugState; }

  /**
   * Returns the current error type for a specific type of debugging
   */
  public static errorType(type: string): boolean | WebORM.ExceptionType;
  public static errorType(type: RegExp): boolean | WebORM.ExceptionType;
  public static errorType(type: WebORM.DebugType): boolean | WebORM.ExceptionType;
  public static errorType(type: string | RegExp | WebORM.DebugType): boolean | WebORM.ExceptionType {
    const constructor = this.constructor as typeof WebOrm;

    if (constructor.debugMap['*']) { return true; }

    const isString = (t): t is string => typeof t === 'string';

    if (isString(type) && constructor.debugMap[type]) {
      return constructor.debugMap[type]!;
    }

    if (isString(type)) {
      const matchingType = Object.keys(constructor.debugMap)
        .find(t => !!t && t.includes(type) && !!constructor.debugMap[t]) as WebORM.ExceptionType | undefined;

      return matchingType || false;
    }

    return (Object.keys(constructor.debugMap).find(t => type.test(t)) as WebORM.ExceptionType | undefined) || false;
  }
  
  private static debugState: 'enabled' | 'disabled' | 'custom' = 'disabled';

  /**
   * Contains the map for all debug types and their respective error types for the ORM.
   */
  private static debugMap: WebORM.IDebugMap = {};

  //#endregion
}
