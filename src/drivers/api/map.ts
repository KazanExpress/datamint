import { IRepositoryMap } from '../../orm/connection';
import { IStorableConstructor } from '../../storable';

export type Fabric<O> = (...options: any[]) => Promise<O>;

export type DataMap<
  C extends IStorableConstructor<any>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]
> = {
  [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<A>;
};

export type ApiMap<R extends IRepositoryMap> = {
  [key in keyof R]: DataMap<R[key]> | undefined;
};
