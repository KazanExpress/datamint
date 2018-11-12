import { IRepositoryMap } from '../../orm/connection';
import { IStorable } from '../../storable';

export type Fabric<S> = (...options: any[]) => Promise<S>;

export type DataMap<S extends IStorable> = {
  [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<S>;
};

export type ApiMap<R extends IRepositoryMap> = {
  [key in keyof R]: DataMap<InstanceType<R[key]>> | undefined;
};
