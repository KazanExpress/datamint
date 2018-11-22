import { IRepoData } from '../repository';
import { Driver } from './base';
export declare class FallbackDriver extends Driver {
    create<A, R extends IRepoData = IRepoData>(repository: R, data: A): Promise<A>;
    read<A, R extends IRepoData = IRepoData>(repository: R, id: any): Promise<A>;
    update<A, R extends IRepoData = IRepoData>(repository: R, id: any, query: (data: A) => Partial<A>): Promise<A>;
    update<A, R extends IRepoData = IRepoData>(repository: R, data: Partial<A>): Promise<A>;
    delete<A, R extends IRepoData = IRepoData>(repository: R, entity: any): Promise<A>;
    private repositoryMap;
}
