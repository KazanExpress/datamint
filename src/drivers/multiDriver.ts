import { Connection } from '../orm';
import { IRepoData } from '../repository';
import { Driver, IDriverConstructor } from './base';

export class MultiDriver extends Driver {
  private drivers: Driver[];

  constructor(
    connection: Connection,
    drivers: IDriverConstructor[]
  ) {
    super(connection);

    this.drivers = drivers.filter(d => d.isSupported).map(D => new D(connection));
  }

  private request(type: 'create' | 'update' | 'read' | 'delete') {
    return function (this: MultiDriver) {
      const allResponses = Promise.all(this.drivers.map(d => d[type].apply(d, arguments)));

      return allResponses[0];
    }.bind(this);
  }

  public readonly create: {
    <A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A>;
  } = this.request('create');

  public readonly read: {
    <A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
  } = this.request('read');

  public readonly update: {
    <A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A>;
    <A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<A>;
  } = this.request('update');

  public readonly delete: {
    <A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
  } = this.request('delete');

  public static readonly isSupported = true;
}
