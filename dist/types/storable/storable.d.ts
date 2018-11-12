import { Debugable, DebugType } from '../debug';
import { DataMap } from '../drivers/api';
import { Repository } from '../repository';
export declare type IStorableConstructor<E extends Storable> = new (options: any, $repository: any) => E;
export declare abstract class Storable extends Debugable {
    readonly $repository: Repository<DataMap<any>, IStorableConstructor<any>, any>;
    protected $debugType: DebugType;
    $connectionName: string;
    constructor($repository: Repository<DataMap<any>, IStorableConstructor<any>, any>);
    abstract $save(): Promise<void>;
    abstract $delete(): Promise<void>;
}
