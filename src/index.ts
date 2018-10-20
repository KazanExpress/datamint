import { NoDriver } from './drivers/NoDriver';
import Entry from './entry';

export * from './drivers';

const LOG_PREFIX = '[WebORM] ';

export default class WebORM {
  public driver: WebORMDriver;
  private APIMap: IAPIMap;

  constructor(
    public name: string,
    options: IWebORMOptions = {}
  ) {
    this.APIMap = options.APIMap || {};
    this.driver = new NoDriver();

    if (options.drivers) {
      options.drivers.forEach(driver => {
        if ((this.driver instanceof NoDriver) && driver.isSuitable()) {
          this.driver = driver;
        }
      });
    }

    if (this.driver instanceof NoDriver) {
      console.warn(`${LOG_PREFIX} Warning! You have no suitable driver for database. Using memory instead.`);
    }

    this.driver.setName(name);
    this.initPressetData(options.preset);
  }

  private initPressetData(data: any = {}) {
    Object.keys(data).forEach(async presetKey => {
      await this.driver.add(presetKey, data[presetKey]);
    });
  }

  public async getEntry(key: string) {
    let mapForPath = this.APIMap[key];
    if (mapForPath && mapForPath.get) {
      return this.driver.get(key, mapForPath.get);
    }

    return this.driver.get(key);
  }

  public async addEntry(key: string, entry: any) {
    return this.driver.add(key, entry);
  }
}

export interface IWebORMOptions {
  drivers?: WebORMDriver[];
  preset?: { [key: string]: any };
  APIMap?: IAPIMap;
}

export interface IAPIMap {
  [key: string]: {
    get?: () => Promise<any>;
    add?: () => (Promise<any> | void);
  };
}

export abstract class WebORMDriver {

  /**
   * Checks if driver can operate in current environment
   *
   * @returns is driver suitable
   */
  public isSuitable(): boolean { return false; }

  public setName(name: string) { }

  public async get(key: string, fetchHandler?: () => (Promise<any> | void)): Promise<Entry> {
    return new Entry(this, key, null, fetchHandler);
  }

  public async add(key: string, entry: any, fetchHandler?: () => (Promise<any> | void)): Promise<boolean> {
    return false;
  }
}
