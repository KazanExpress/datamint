import { Connection } from '../../orm/connection';
import { Driver } from '../base';
import { ApiMap } from './map';
import { IRepoData } from '../../repository';

export * from './map';

/* TODO */
export class ApiDriver extends Driver {
  constructor(
    connection: Connection<any, any>,
    protected apiMap: ApiMap<any>
  ) { super(connection); }

  public create(repository: IRepoData, data: any): Promise<any> {
    const repo = this.apiMap[repository.name];

    if (repo && repo.create) {
      return repo.create(data);
    } else {
      return Promise.reject(/* TODO: error handling */);
    }
  }

  public read(repository: IRepoData, data: any): Promise<any> {
    const repo = this.apiMap[repository.name];

    if (repo && repo.read) {
      return repo.read(data);
    } else {
      return Promise.reject(/* TODO: error handling */);
    }
  }

  public update(repository: IRepoData, id: any, query: (data: any) => any): Promise<any>;
  public update(repository: IRepoData, data: Partial<any>): Promise<any>;
  public async update(repository: any, data: any, query?: any) {
    const repo = this.apiMap[repository.name];

    if (!repo || !repo.update) {
      return Promise.reject(/* TODO: error handling */);
    }

    if (query) {
      const result = await this.read(repository, data);

      return repo.update(query(result));
    }

    return repo.update(data);
  }

  public delete(repository: IRepoData, data: any): Promise<any> {
    const repo = this.apiMap[repository.name];

    if (repo && repo.delete) {
      return repo.delete(data);
    } else {
      return Promise.reject(/* TODO: error handling */);
    }
  }

  public static get isSupported() { return true; }
}
