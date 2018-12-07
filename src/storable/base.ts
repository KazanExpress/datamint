import { enumerable } from '../decorators';

export type IStorableConstructor<E extends Storable> = new (options: any, ...args: any[]) => E;

export abstract class Storable {
  @enumerable(false)
  private __col__: Array<PropertyKey> = [];

  @enumerable(false)
  protected __options: any;

  constructor(__options: any, ..._: any[]) {
    this.__options = __options;
  }

  public static Property(target: Storable, key: PropertyKey) {
    if (!target.__col__) {
      target.__col__ = [];
    }

    target.__col__.push(key);
  }
}

export interface IActiveRecord {
  $save(): Promise<this | undefined>;
  $delete(): Promise<this | undefined>;
}
