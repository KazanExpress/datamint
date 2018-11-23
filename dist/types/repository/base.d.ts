import { DataMap } from '../apiMap';
import { Debugable, DebugType } from '../debug';
import { Driver } from '../drivers';
import { IStorableConstructor, Storable } from '../storable';
export interface IRepoConnectionInternal {
    name: string;
    currentDriver: Driver;
}
export interface IRepoConnection<DM> extends IRepoConnectionInternal {
    apiMap: DM;
}
export interface IRepoData {
    name: string;
}
export declare type FromSecArg<T extends undefined | ((arg: any, other: any) => any)> = T extends ((arg: any, other: infer U) => any) ? U : undefined;
export declare abstract class Repository<DM extends DataMap<C> | undefined, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Debugable implements IRepoData {
    name: string;
    private Data;
    protected readonly $debugType: DebugType;
    protected readonly connection: IRepoConnectionInternal;
    readonly $connectionName: string;
    constructor(name: string, connection: IRepoConnection<DM>, Data: C);
    protected readonly api: DM;
    protected makeDataInstance(options: A): E;
}
