import { Debugable, DebugType } from '../debug';
import { IDriverConstructor } from '../drivers';
import { Connection } from '../connection';
import { IStorableConstructor, Storable } from '../storable';
export interface IRepoData<IDKey = PropertyKey> {
    readonly name: string;
    readonly columns?: Array<string>;
    readonly primaryKey?: IDKey;
}
export declare type FromSecArg<T extends undefined | ((arg: any, other: any) => any)> = T extends ((arg: any, other: infer U) => any) ? U : undefined;
export declare type DataMap<C extends IStorableConstructor<any>, Keys extends string = string> = {
    [key in Keys]: ((...args: any[]) => Promise<InstanceType<C>>) | undefined;
};
export declare abstract class Repository<DM, C extends IStorableConstructor<E>, E extends Storable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Debugable {
    readonly name: string;
    readonly $connectionName: string;
    private readonly Data;
    protected readonly api?: DM | undefined;
    protected readonly $debugType: DebugType;
    constructor(name: string, $connectionName: string, Data: C, api?: DM | undefined);
    protected makeDataInstance(options: A): E;
}
export interface IRepoFactoryOptions<C, D> {
    model: C;
    api: D;
}
export declare type RepoFactory<Repo extends Repository<any, any> = Repository<any, any>> = (name: string, connection: Connection) => Repo;
export declare function selectDriver(drivers: IDriverConstructor | IDriverConstructor[], repoName: string): IDriverConstructor;
