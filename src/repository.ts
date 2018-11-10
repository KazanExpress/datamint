import { QueryResult } from './queryResult';
import { WebORM } from './orm';

export type Constructor = new (...args: any[]) => any;

type PartialArgs<T extends ConstructorParameters<any>> = T & Array<any>;

/**
 * @TODO:
 * - Check for `__col__` props on entity prototype
 * - Async API MAP crap for handling QueryResults
 */

export class Repository<C extends Constructor> {
  constructor(
    protected ormInstance: WebORM,
    protected entity: C
  ) {

  }

  public add(...args: ConstructorParameters<C>): QueryResult<InstanceType<C>> {
    return new QueryResult(true, new this.entity(...args));
  }
  
  public get(): QueryResult<InstanceType<C>> {
    return new QueryResult(true, new this.entity());
  }
  
  public update(...args: PartialArgs<ConstructorParameters<C>>): QueryResult<InstanceType<C>> {
    return new QueryResult(true, new this.entity(...args));
  }
  
  public delete(...args: PartialArgs<ConstructorParameters<C>>): QueryResult<InstanceType<C>> {
    return new QueryResult(true, new this.entity(...args));
  }
}

