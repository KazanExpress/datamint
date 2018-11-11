import { RepoStore } from './connection';
import { EntityRepository, RecordRepository } from '../repository';
import { IStorable } from '../storable';

export type Fabric<S extends IStorable> = (...options: any[]) => Promise<S>;

export type DataMap<S extends IStorable> = {
  [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<S>;
};

export type ApiMap<R extends RepoStore<any>> = {
  [key in keyof R]?: DataMap<R[key] extends EntityRepository<any, any, infer ES> ?
    ES
  : R[key] extends RecordRepository<any, any, infer RS> ?
    RS
  : any>;
};
