import { fromPath } from './';
import { WebORMDriver } from '../';
import Entry from '../entry';

export class LocalStorageDriver implements WebORMDriver {
  private name: string = '';

  public isSuitable() {
    return typeof localStorage !== 'undefined';
  }

  public setName(name: string) {
    this.name = name;
  }

  public async get(key: string, fetchHandler?: () => (Promise<any> | void)) {
    let result = undefined;
    let obj = this.getRootFromPath(key);

    if (obj) {
      let path = key.split('/').slice(1).join('/');
      result = fromPath(obj, path, '/');
    }

    return new Entry(this, key, result, fetchHandler);
  }

  public async add(key: string, entry: any, fetchHandler?: () => (Promise<any> | void)) {
    let obj = this.getRootFromPath(key);
    obj = typeof obj === 'object' ? Object(obj) : {};

    let pathArr = key.split('/');
    let path = pathArr.slice(1).join('/');

    obj = this.setDeepVal(obj, path, entry);
    localStorage.setItem(`${this.name}_${pathArr[0]}`, JSON.stringify(obj));

    return true;
  }

  private setDeepVal(obj, path: string, val) {
    if (!path) {
      if (typeof val === 'object') {
        return { ...obj, ...val };
      }

      return obj;
    }

    let props = path.split('/');
    let workingObj = obj;
    for (var i = 0, n = props.length - 1; i < n; ++i) {
      workingObj = workingObj[props[i]] = workingObj[props[i]] || {};
    }
    workingObj[props[i]] = val;

    return obj;
  }

  private getRootFromPath(path: string) {
    let rootPath = path.split('/')[0];

    if (rootPath) {
      let stringObj = localStorage.getItem(`${this.name}_${rootPath}`);

      if (stringObj) {
        return JSON.parse(stringObj);
      }
    }
  }
}
