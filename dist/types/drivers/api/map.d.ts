import { IRepositoryMap } from '../../orm/connection';
import { IStorableConstructor, Storable, Entity } from '../../storable';
export declare type Fabric<O> = (...options: any[]) => Promise<O>;
export declare type DataFabric<O> = {
    [key in 'create' | 'read' | 'update' | 'delete']?: Fabric<O>;
};
export declare type DataMap<C extends IStorableConstructor<any>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> = DataFabric<A> & (E extends Entity ? {
    cluster: DataFabric<A[]> & {
        append?: Fabric<A[]>;
    };
} : {});
export declare type ApiMap<R extends IRepositoryMap> = {
    [key in keyof R]: DataMap<R[key]> | undefined;
};
