import { Connection } from '../orm';
import { IRepoData } from '../repository';
import { Driver, IDriverConstructor } from './base';
export declare class MultiDriver extends Driver {
    private drivers;
    constructor(connection: Connection, drivers: IDriverConstructor[]);
    private request;
    readonly create: {
        <A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A>;
    };
    readonly read: {
        <A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
    };
    readonly update: {
        <A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A>;
        <A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<A>;
    };
    readonly delete: {
        <A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
    };
    static readonly isSupported: boolean;
}
