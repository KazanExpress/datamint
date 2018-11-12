import { Debugable, DebugType } from '../debug';
import { Driver } from '../drivers';
import { ApiDriver, DataMap } from '../drivers/api';
import { IStorableConstructor, Storable } from '../storable';
export interface IRepoConnectionInternal {
    name: string;
    currentDriver: Driver;
}
export interface IRepoConnection extends IRepoConnectionInternal {
    apiDriver?: ApiDriver;
}
export declare class Repository<DM extends DataMap<E>, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Debugable {
    name: string;
    protected Data: C;
    protected readonly debugType: DebugType;
    protected readonly connection: IRepoConnectionInternal;
    readonly connectionName: string;
    constructor(name: string, connection: IRepoConnection, Data: C);
    readonly api?: ApiDriver;
}
