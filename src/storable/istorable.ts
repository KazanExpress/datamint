export type IStorableConstructor<E extends IStorable> = new (options) => E;

export interface IStorable {
  $save(): Promise<void>;
  $delete(): Promise<void>;
}