import { Debug, Debugable, DebugType } from '../debug';
import { FallbackDriver, IDriverConstructor } from '../drivers';
import { MultiDriver } from '../drivers/multiDriver';
import { Connection } from '../connection';
import { IStorableConstructor, Storable } from '../storable';

export interface IRepoData<IDKey = PropertyKey> {
  readonly name: string;
  readonly columns?: Array<string>;
  readonly primaryKey?: IDKey;
}

export type FromSecArg<
  T extends undefined | ((arg: any, other: any) => any)
> = T extends ((arg: any, other: infer U) => any) ? U : undefined;

export type DataMap<C extends IStorableConstructor<any>, Keys extends string = string> = {
  [key in Keys]: ((...args: any[]) => Promise<InstanceType<C>>) | undefined;
};

export abstract class Repository<
  DM,
  C extends IStorableConstructor<E>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
> extends Debugable {
  protected readonly $debugType: DebugType = `db:${this.name.toLowerCase()}` as DebugType;

  constructor(
    public readonly name: string,
    public readonly $connectionName: string,
    private readonly Data: C,
    protected readonly api?: DM,
  ) {
    super();

    if (!api) {
      this.$warn('The main functionality is disabled. Are you sure you want to use this without API?', true);
    }

    if (/* this class was instantiated directly (without inheritance) */
      Repository.prototype === this.constructor.prototype
    ) {
      if (this.$debugEnabled) {
        this.$error(`Using default empty repository.`);
      } else {
        Debug.$error(`Using default empty repository for ${name}`, true);
      }
    }
  }

  protected makeDataInstance(options: A): E {
    // Cast to any to allow passing `this` as a second arg for classes implementing IActiveRecord to work
    return new (this.Data as any)(options, this);
  }
}

export interface IRepoFactoryOptions<C, D> {
  model: C;
  api: D;
}

export type RepoFactory<Repo extends Repository<any, any> = Repository<any, any>> = (name: string, connection: Connection) => Repo;

export function selectDriver(drivers: IDriverConstructor | IDriverConstructor[], repoName: string): IDriverConstructor {
  const error = () => {
    let msg: string = `No supported driver provided for ${repoName}.`;

    if (Debug.map['*'] !== 'hard') {
      msg += ' Using fallback.';
    }

    Debug.$error(msg);
  };

  if (Array.isArray(drivers)) {
    // Select the first supported driver from the bunch
    const SupportedDrivers = drivers.filter(d => d.isSupported);
    if (SupportedDrivers.length > 0) {
      return SupportedDrivers[0];
    } else {
      return error(), FallbackDriver;
    }
  } else if (drivers instanceof MultiDriver) {
    return drivers;
  } else {
    return error(), FallbackDriver;
  }
}
