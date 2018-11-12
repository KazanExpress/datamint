import { IRepositoryMap } from '../../orm/connection';
import { IStorableConstructor } from '../../storable';
export declare type Fabric<O> = (...options: any[]) => Promise<O>;
export declare type DataMap<C extends IStorableConstructor<any>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> = {
    [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<A>;
};
export declare type ApiMap<R extends IRepositoryMap> = {
    [key in keyof R]: DataMap<R[key]> | undefined;
};
