import { Driver } from './base';
import { IRepoData } from '../repository';

/* TODO: driver that just writes everything to short-term memory */
export class FallbackDriver extends Driver {
  public async create<A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A> {
    this.repositoryMap[repository.name] = this.repositoryMap[repository.name] || [];

    this.repositoryMap[repository.name].push(data);

    return data;
  }

  public read<A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A> {
    throw new Error('Method not implemented.');
  }

  public update<A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A>;
  public update<A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<A>;
  public update(repository: any, id: any, query?: any) {
    throw new Error('Method not implemented.');

    return Promise.resolve();
  }

  public delete<A, R extends IRepoData = IRepoData>(repository: R, entity: any): Promise<A> {
    const idx = this.repositoryMap[repository.name].findIndex(e => Object.keys(e).some(key => {
      return e[key] === entity[key];
    }));

    const res = this.repositoryMap[repository.name][idx];

    this.repositoryMap[repository.name].splice(idx, 1);

    return res;
  }
  private repositoryMap: any = {};





}
