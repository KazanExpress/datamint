import { Driver } from '../base';
import { Connection } from '../../orm/connection';
import { ApiMap } from './map';
export * from './map';
export declare class ApiDriver extends Driver {
    protected apiMap: ApiMap<any>;
    constructor(connection: Connection<any, any>, apiMap: ApiMap<any>);
    create(repositoryName: string, data: any): Promise<any>;
    read(repositoryName: string, data: any): Promise<any>;
    update(repositoryName: string, id: any, query: (data: any) => any): Promise<any>;
    update(repositoryName: string, data: Partial<any>): Promise<any>;
    delete(repositoryName: string, data: any): Promise<any>;
}
