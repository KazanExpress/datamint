import { IStorable, Entity } from './storable';
import { RepoStore, IRepositoryMap } from './orm/connection';
import { EntityRepository, RecordRepository } from './repository';

export type Fabric<S> = (...options: any[]) => Promise<S>;

export type DataMap<S extends IStorable> = {
  [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<S>;
};

export type ApiMap<R extends IRepositoryMap> = {
  [key in keyof R]?: DataMap<InstanceType<R[key]>>;
};
