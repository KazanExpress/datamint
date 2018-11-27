import { IRepositoryMap } from './orm/connection';
import { BrokenRepository, EntityRepository, IEntityRepoMethods, IRecordRepoMethods, RecordRepository } from './repository';
import { Entity, IStorableConstructor, Record } from './storable';

export type DataMap<
  C extends IStorableConstructor<any>
> = EntityDataMap<C> | RecordDataMap<C> | BrokenDataMap<C>;

export type EntityDataMap<
  C extends IStorableConstructor<any>
> = IEntityRepoMethods<C>;

export type RecordDataMap<
  C extends IStorableConstructor<any>
> = IRecordRepoMethods<C>;

export type BrokenDataMap<
  C extends IStorableConstructor<any>,
  Keys extends PropertyKey = keyof (IEntityRepoMethods<C> & IRecordRepoMethods<C>)
> = {
  [key in Keys]?: (...options: any[]) => Promise<InstanceType<C>>;
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
