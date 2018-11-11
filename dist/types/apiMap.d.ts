import { IStorable } from './storable';
import { IRepositoryMap } from './orm/connection';
export declare type Fabric<S> = (...options: any[]) => Promise<S>;
export declare type DataMap<S extends IStorable> = {
    [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<S>;
};
export declare type ApiMap<R extends IRepositoryMap> = {
    [key in keyof R]?: DataMap<InstanceType<R[key]>>;
};
