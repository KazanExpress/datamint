import { Connection } from '../orm';
import { IStorable, IStorableConstructor } from '../storable';
/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */
export declare class Repository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>> {
    name: string;
    readonly connection: Connection<any>;
    protected Data: C;
    constructor(name: string, connection: Connection<any>, Data: C);
}
