export declare type IStorableConstructor<E extends IStorable> = new (options: any) => E;
export interface IStorable {
    $save(): Promise<void>;
    $delete(): Promise<void>;
}
