import { Connection } from '../orm';
export interface IDriverConstructor extends Function {
    new (connection: Connection): Driver;
    readonly isSupported: boolean;
}
export declare abstract class Driver {
    protected connection: Connection;
    constructor(connection: Connection);
    abstract create<T extends object>(repositoryName: string, entity: T): Promise<T>;
    abstract read<T extends object>(repositoryName: string, id: any): Promise<T>;
    abstract update<T extends object>(repositoryName: string, id: any, data: Partial<T>): Promise<T>;
    abstract update<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;
    abstract delete<T extends object>(repositoryName: string, id: any): Promise<T>;
    abstract delete<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;
    /**
     * Determines if the driver is supported in current environment
     */
    static readonly isSupported: boolean;
}
