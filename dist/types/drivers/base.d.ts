import { Connection } from '../connection';
import { Debugable, DebugType } from '../debug';
import { IRepoData } from '../repository';
export interface IDriverConstructor extends Function {
    new (connection: Connection): Driver;
    readonly isSupported: boolean;
}
export declare abstract class Driver extends Debugable {
    protected connection: Connection;
    protected readonly debugType: DebugType;
    readonly connectionName: string;
    constructor(connection: Connection);
    abstract create<A extends object, R extends IRepoData>(repository: R, data: A): Promise<A>;
    abstract findById<A extends object, R extends IRepoData, ID extends PropertyKey>(repository: R, id: ID): Promise<A | undefined>;
    abstract update<A extends object, R extends IRepoData>(repository: R, data: Partial<A>): Promise<Array<A>>;
    abstract updateOne<A extends object, R extends IRepoData, ID extends PropertyKey>(repository: R, id: ID, query: ((entity: A) => Partial<A>) | Partial<A>): Promise<A | undefined>;
    abstract delete<A extends object, R extends IRepoData>(repository: R, data: Partial<A>): Promise<Array<A>>;
    abstract deleteOne<A extends object, R extends IRepoData, ID extends PropertyKey>(repository: R, id: ID): Promise<A | undefined>;
    /**
     * Determines if the driver is supported in current environment
     */
    static readonly isSupported: boolean;
}
