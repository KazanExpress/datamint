import { IRepoData } from '../repository';
import { Driver } from './base';
/**
 * @todo refactor, code is a mess
 */
export declare class FallbackDriver extends Driver {
    create<A, R extends IRepoData>({ primaryKey, name }: R, data: A): Promise<A>;
    findById<A, R extends IRepoData>({ primaryKey, name }: R, id: PropertyKey): Promise<any>;
    update<A, R extends IRepoData>({ name, primaryKey }: R, data: Partial<A>): Promise<Array<A>>;
    updateOne<A extends object, R extends IRepoData>({ name, primaryKey }: R, id: PropertyKey, query: ((entity: A) => Partial<A>) | Partial<A>): Promise<A | undefined>;
    deleteOne<A, R extends IRepoData>({ name, primaryKey }: R, id: PropertyKey): Promise<A | undefined>;
    delete<A, R extends IRepoData>({ name, primaryKey }: R, entity: Partial<A>): Promise<Array<A>>;
    private repositoryMap;
}
