import { IRepositoryMap } from './orm/connection';
import { BrokenRepository, EntityRepository, RecordRepository } from './repository';
import { Entity, IStorableConstructor, Record } from './storable';

type FunctionKeys<T> = Exclude<{
  [K in keyof T]: T[K] extends ((...args: any[]) => any) ? K : never
}[keyof T], undefined>;

type NormalFabric<A> = (options: A, apiOptions?: any) => Promise<A>;
type BrokenFabric<I> = (...apiOptions: any[]) => Promise<I>;

export type DataMap<
  C extends IStorableConstructor<any>
> = EntityDataMap<C> | RecordDataMap<C> | BrokenDataMap<C>;

export type EntityDataMap<
  C extends IStorableConstructor<any>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = {
  [key in FunctionKeys<EntityRepository<any, any>>]: NormalFabric<A> | undefined;
};

export type RecordDataMap<
  C extends IStorableConstructor<any>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = {
  [key in FunctionKeys<RecordRepository<any, any>>]: NormalFabric<A> | undefined;
};

export type BrokenDataMap<
  C extends IStorableConstructor<any>,
  Keys extends PropertyKey = FunctionKeys<RecordRepository<any, any> & EntityRepository<any, any>>
> = {
  [key in Keys]?: BrokenFabric<InstanceType<C>>;
};

export type RepoFromDataMap<
  C extends IStorableConstructor<any>,
  DM extends DataMap<C>,
  E extends InstanceType<C> = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = DM extends EntityDataMap<C> ? (
  E extends Entity ? EntityRepository<DM, C, E, A> : BrokenRepository<DM>
) : DM extends RecordDataMap<C> ? (
  E extends Record ? RecordRepository<DM, C, E, A> : BrokenRepository<DM>
) : BrokenRepository<DM>;

export type ApiMap<R extends IRepositoryMap> = {
  [key in keyof R]: (
    InstanceType<R[key]> extends Entity ?
      EntityDataMap<R[key]> :
    InstanceType<R[key]> extends Record ?
      RecordDataMap<R[key]> :
    BrokenDataMap<R[key]>
  ) | undefined;
};
