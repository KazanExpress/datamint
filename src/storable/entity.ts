import { Repository } from '../repository';
import { Enumerable, Key } from '../util';
import { Storable } from './storable';

export class Entity<
  IDKey extends Key = string,
  ID = any
> extends Storable {
  // TODO: check to be writable
  @Enumerable(false)
  private __col__: Array<string> = [];

  @Enumerable(false)
  private __idCol__?: IDKey;

  @Enumerable(false)
  private __idValue__?: ID;

  constructor(
    options,
    $repository: Repository<any, any, any>
  ) {
    super($repository);

    if (this.__idCol__) {
      this.__idValue__ = options[this.__idCol__];
    }
  }

  @Enumerable(false)
  public $save() {
    return Promise.resolve();
  }

  @Enumerable(false)
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

export const Column = Entity.Column;
export const ID = Entity.ID;
