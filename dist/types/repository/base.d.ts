import { IStorable, IStorableConstructor } from '../storable';
import { Driver } from '../drivers';
import { ApiDriver } from '../drivers/api';
import { DataMap } from '../apiMap';
/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */
export declare class Repository<DM extends DataMap<any>, C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> {
    name: string;
    protected readonly connection: {
        name: string;
        currentDriver: Driver;
        apiDriver?: ApiDriver;
    };
    protected Data: C;
    constructor(name: string, connection: {
        name: string;
        currentDriver: Driver;
        apiDriver?: ApiDriver;
    }, Data: C);
}
