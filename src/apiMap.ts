import { IRepositoryMap } from './orm/connection';
import { DefaultRepository, EntityRepository, RecordRepository } from './repository';
import { Entity, IStorableConstructor, Record } from './storable';

type FunctionKeys<T> = Exclude<{
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T], undefined>;

type Fabric<A> = ((options: A, ...apiOptions: any[]) => Promise<A>);

export type DataMap<
  C extends IStorableConstructor<any>
> = EntityDataMap<C> | RecordDataMap<C>;

export type EntityDataMap<
  C extends IStorableConstructor<any>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = {
  [key in FunctionKeys<EntityRepository<any, any, any, any>>]: Fabric<A> | undefined;
};

export type RecordDataMap<
  C extends IStorableConstructor<any>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
  > = {
    [key in FunctionKeys<RecordRepository<any, any, any, any>>]: Fabric<A> | undefined;
  };

export type RepoFromDataMap<
  C extends IStorableConstructor<any>,
  DM extends EntityDataMap<C> | RecordDataMap<C>,
  E extends InstanceType<C> = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = DM extends EntityDataMap<C> ? (
  E extends Entity ? EntityRepository<DM, C, E, A> : DefaultRepository
) : DM extends RecordDataMap<C> ? (
  E extends Record ? RecordRepository<DM, C, E, A> : DefaultRepository
) : DefaultRepository;

export type ApiMap<R extends IRepositoryMap> = {
  [key in keyof R]: InstanceType<R[key]> extends Entity ? EntityDataMap<R[key]> : RecordDataMap<R[key]> | undefined;
};
