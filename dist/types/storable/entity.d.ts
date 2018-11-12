import { Repository } from '../repository';
import { Key } from '../util';
import { Storable } from './storable';
export declare class Entity<IDKey extends Key = string, ID = any> extends Storable {
    private __col__;
    private __idCol__?;
    private __idValue__?;
    constructor(options: any, $repository: Repository<any, any, any>);
    $save(): Promise<void>;
    $delete(): Promise<void>;
    static Column(target: typeof Entity['prototype'], key: string): void;
    static ID(target: typeof Entity['prototype'], key: string): void;
}
export declare const Column: typeof Entity.Column;
export declare const ID: typeof Entity.ID;
