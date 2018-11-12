import { Driver } from '..';
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

  public read(repositoryName: string, id: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public update(repositoryName: string, id: any, query: (data: any) => Partial<any>): Promise<any>;
  public update(repositoryName: string, data: Partial<any>): Promise<any>;
  public update(repositoryName: any, id: any, query?: any) {
    throw new Error('Method not implemented.');

    return Promise.resolve();
  }
  public delete(repositoryName: string, id: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
