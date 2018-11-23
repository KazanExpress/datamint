import { IEntityRepoData, IRepoData } from '../repository';
import { Driver } from './base';

const isEntityRepo = (r): r is IEntityRepoData<any> => !!(r as IEntityRepoData<any>).columns;

/* TODO: driver that just writes everything to short-term memory */
export class FallbackDriver extends Driver {
  public async create<A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A> {
    if (isEntityRepo(repository)) {
      this.repositoryMap[repository.name] = {};

      this.repositoryMap[repository.name][data[repository.primaryKey]] = data;
    } else {
      this.repositoryMap[repository.name] = data;
    }

    return data;
  }

  public read<A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A> {
    if (isEntityRepo(repository)) {
      return this.repositoryMap[repository.name][id];
    }

    return this.repositoryMap[repository.name];
  }

  public update<A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A>;
  public update<A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<A>;
  public update(repository: any, id: any, query?: any) {
    throw new Error('Method not implemented.');

    return Promise.resolve();
  }

  public delete<A, R extends IRepoData = IRepoData>(repository: R, entity: any): Promise<A> {
    const repo = this.repositoryMap[repository.name];

    let res;

    if (isEntityRepo(repository)) {
      const key = Object.keys(repo).findIndex(e => Object.keys(repo[e]).some(key => {
        return e[key] === entity[key];
      }));

      res = this.repositoryMap[repository.name][key];

      this.repositoryMap[repository.name][key] = undefined;

      delete this.repositoryMap[repository.name][key];
    } else {
      res = this.repositoryMap[repository.name];

      this.repositoryMap[repository.name] = undefined;
    }

    return res;
  }

  private repositoryMap: any = {};
}
