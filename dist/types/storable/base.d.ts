export declare type IStorableConstructor<E extends Storable> = new (options: any, ...args: any[]) => E;
export declare abstract class Storable {
    private __col__;
    protected __options: any;
    constructor(__options: any, ..._: any[]);
    static Property(target: Storable, key: PropertyKey): void;
}
export interface IActiveRecord {
    $save(): Promise<this | undefined>;
    $delete(): Promise<this | undefined>;
}
