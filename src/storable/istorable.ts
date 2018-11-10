import { Repository } from '../repository';

export type IStorableConstructor<E extends IStorable> = new (options) => E;

export interface IStorable {
  repository: Repository<IStorableConstructor<IStorable>>;

  $save(): Promise<void>;
  $delete(): Promise<void>;
}