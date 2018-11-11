import { Driver } from './base';
import { Connection } from '../orm/connection';
import { ApiMap } from '../apiMap';
export declare class ApiDriver extends Driver {
    protected apiMap: ApiMap<any>;
    constructor(connection: Connection<any, any>, apiMap: ApiMap<any>);
    create(repositoryName: string, data: any): Promise<any>;
    read(repositoryName: string, id: any): Promise<any>;
    update(repositoryName: string, id: any, query: (data: any) => Partial<any>): Promise<any>;
    update(repositoryName: string, data: Partial<any>): Promise<any>;
    delete(repositoryName: string, id: any): Promise<any>;
}
