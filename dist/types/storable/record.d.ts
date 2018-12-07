import { RecordRepositoryClass } from '../repository/record';
import { IActiveRecord, Storable } from './base';
export declare class Record extends Storable {
    constructor(options: any, ...args: any[]);
}
export declare class SaveableRecord extends Record implements IActiveRecord {
    private readonly __debug;
    private readonly __repo?;
    private __contextWarning;
    constructor(options: any, repo?: RecordRepositoryClass<any, any, any, any>);
    $save(): Promise<undefined> | Promise<this>;
    $delete(): Promise<this | undefined>;
}
