import { IRepositoryMap } from '../../orm/connection';
import { IStorableConstructor, Storable, Entity } from '../../storable';
import { EntityRepository, RecordRepository, Repository } from '../../repository';

export type Fabric<O> = (...options: any[]) => Promise<O>;

type FunctionKeys<O> = keyof {
  [key in keyof O]: O[key] extends Function ? O[key] : never;
};

export type DataFabric<O, R> = {
  [key in FunctionKeys<R>]?: Fabric<O>;
};

export type DataMap<
  C extends IStorableConstructor<any>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
  R extends Repository<any, C, E, A> = E extends Entity ? EntityRepository<any, C, E, A> : RecordRepository<any, C, E, A>
> = DataFabric<A, R> & (E extends Entity ? {
  cluster: DataFabric<A[], R>;
} : {});

export type ApiMap<R extends IRepositoryMap> = {
  [key in keyof R]: DataMap<R[key]> | undefined;
};
