import { Connection } from '../../orm/connection';
import { Driver } from '../base';
import { ApiMap } from './map';
import { IRepoData } from '../../repository';
export * from './map';
export declare class ApiDriver extends Driver {
    protected apiMap: ApiMap<any>;
    constructor(connection: Connection<any, any>, apiMap: ApiMap<any>);
    create(repository: IRepoData, data: any): Promise<any>;
    read(repository: IRepoData, data: any): Promise<any>;
    update(repository: IRepoData, id: any, query: (data: any) => any): Promise<any>;
    update(repository: IRepoData, data: Partial<any>): Promise<any>;
    delete(repository: IRepoData, data: any): Promise<any>;
    static readonly isSupported: boolean;
}
