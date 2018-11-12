import { Driver } from './base';

/* TODO: driver that just writes everything to short-term memory */
export class FallbackDriver extends Driver {
  private repositoryMap: any = {};

  public async create<T extends object>(repositoryName: string, entity: T): Promise<T> {
    this.repositoryMap[repositoryName] = this.repositoryMap[repositoryName] || [];

    this.repositoryMap[repositoryName].push(entity);

    return entity;
  }

  public read<T extends object>(repositoryName: string, id: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public update<T extends object>(repositoryName: string, id: any, data: Partial<T>): Promise<T>;
  public update<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;
  public async update(repositoryName: any, id: any, data?: any) {
    throw new Error('Method not implemented.');

    return {};
  }
  public delete<T extends object>(repositoryName: string, id: any): Promise<T>;
  public async delete(repositoryName: any, entity: any) {
    const idx = this.repositoryMap[repositoryName].findIndex(e => Object.keys(e).some(key => {
      return e[key] === entity[key];
    }));

    const res = this.repositoryMap[repositoryName][idx];

    this.repositoryMap[repositoryName].splice(idx, 1);

    return res;
  }


}
