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

  private request(
    type: { [key in keyof Driver]: Driver[key] extends Function ? key : never }[keyof Driver]
  ) {
    return function (this: MultiDriver) {
      const args = arguments;
      const allResponses = Promise.all(this.drivers.map(d => d[type].apply(d, args)));

      return allResponses[0];
    }.bind(this);
  }

  public readonly create: {
    <A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A>;
  } = this.request('create');

  public readonly findById: {
    <A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
  } = this.request('findById');

  public readonly update: {
    <A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<Array<A>>;
  } = this.request('update');

  public readonly updateOne: {
    <A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A | undefined>;
  } = this.request('updateOne');

  public readonly deleteOne: {
    <A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
  } = this.request('deleteOne');

  public readonly delete: {
    <A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<Array<A>>;
  } = this.request('delete');

  public static get isSupported() { return true; }
}
