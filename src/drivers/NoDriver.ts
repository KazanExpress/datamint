import { WebORMDriver } from '../';
import Entry from '../entry';

export class NoDriver implements WebORMDriver {
  public isSuitable() {
    return true;
  }

  public setName(name: string) { }

  public async get(key: string, fetchHandler?: () => (Promise<any> | void)) {
    return new Entry(this, key, null);
  }

  public async add(key: string, entry: any, fetchHandler?: () => (Promise<any> | void)) {
    return false;
  }
}
