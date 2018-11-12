import { Connection } from '../orm';
import { IRepoData } from '../repository';
export interface IDriverConstructor extends Function {
    new (connection: Connection): Driver;
    readonly isSupported: boolean;
}
export declare abstract class Driver {
    protected connection: Connection;
    constructor(connection: Connection);
    abstract create<A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A>;
    abstract read<A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
    abstract update<A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A>;
    abstract update<A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<A>;
    abstract delete<A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
    /**
     * Determines if the driver is supported in current environment
     */
    static readonly isSupported: boolean;
}
