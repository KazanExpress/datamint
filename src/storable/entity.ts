import { IStorable } from './istorable';
import { NonEnumerable } from '../util';

export class Entity<ID = any> implements IStorable {
  @NonEnumerable
  private __col__: Array<string> = [];

  @NonEnumerable
  private __idCol__: string = '';

  @NonEnumerable
  private __idValue__: ID;

  constructor(options) {
    this.__idValue__ = options[this.__idCol__];
  }

  public $save() {
    return Promise.resolve();
  }

  public $delete() {
    return Promise.resolve();
  }

  public static Column(target: typeof Entity['prototype'], key: string) {
    target.__col__.push(key);
  }

  public static ID(target: typeof Entity['prototype'], key: string) {
    target.__idCol__ = key;
  }
}