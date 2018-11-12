import { Driver } from '../base';
import { Connection } from '../../orm/connection';
import { ApiMap } from './map';

export * from './map';

/* TODO */
export class ApiDriver extends Driver {
  constructor(
    connection: Connection<any, any>,
    protected apiMap: ApiMap<any>
  ) { super(connection); }

  public create(repositoryName: string, data: any): Promise<any> {
    const repo = this.apiMap[repositoryName];

    if (repo && repo.create) {
      return repo.create(data);
    } else {
      return Promise.reject(/* TODO: error handling */);
    }
  }

  public read(repositoryName: string, data: any): Promise<any> {
    const repo = this.apiMap[repositoryName];

    if (repo && repo.read) {
      return repo.read(data);
    } else {
      return Promise.reject(/* TODO: error handling */);
    }
  }

  public update(repositoryName: string, id: any, query: (data: any) => any): Promise<any>;
  public update(repositoryName: string, data: Partial<any>): Promise<any>;
  public async update(repositoryName: any, data: any, query?: any) {
    const repo = this.apiMap[repositoryName];

    if (!repo || !repo.update) {
      return Promise.reject(/* TODO: error handling */);
    }

    if (query) {
      const result = await this.read(repositoryName, data);

      return repo.update(query(result));
    }

    return repo.update(data);
  }
  public delete(repositoryName: string, data: any): Promise<any> {
    const repo = this.apiMap[repositoryName];

    if (repo && repo.delete) {
      return repo.delete(data);
    } else {
      return Promise.reject(/* TODO: error handling */);
    }
  }
}
