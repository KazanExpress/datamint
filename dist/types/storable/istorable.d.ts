import { Repository } from '../repository';
export declare type IStorableConstructor<E extends IStorable> = new (options: any) => E;
export interface IStorable {
    repository: Repository<IStorableConstructor<IStorable>>;
    $save(): Promise<void>;
    $delete(): Promise<void>;
}
