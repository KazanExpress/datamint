import { IStorable } from './istorable';
export declare class Record implements IStorable {
    $save(): Promise<void>;
    $delete(): Promise<void>;
}
