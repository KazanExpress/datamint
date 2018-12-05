import { enumerable } from '../decorators';

export type IStorableConstructor<E extends Storable> = new (options) => E;

export abstract class Storable {
  @enumerable(false)
  private static __col__: Array<PropertyKey> = [];

  @enumerable(false)
  protected __options;

  constructor(__options) {
    this.__options = __options;
  }

  public static Property(target: Storable, key: PropertyKey) {
    const constructor = (target.constructor as typeof Storable);

    if (!constructor.__col__) {
      constructor.__col__ = [];
    }

    constructor.__col__.push(key);
  }
}

export interface IActiveRecord {
  $save(): Promise<this | undefined>;
  $delete(): Promise<this | undefined>;
}
