import { Driver } from './base';
export declare class FallbackDriver extends Driver {
    private repositoryMap;
    create<T extends object>(repositoryName: string, entity: T): Promise<T>;
    read<T extends object>(repositoryName: string, id: any): Promise<T>;
    update<T extends object>(repositoryName: string, id: any, data: Partial<T>): Promise<T>;
    update<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;
    delete<T extends object>(repositoryName: string, id: any): Promise<T>;
}
