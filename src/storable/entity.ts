import { enumerable } from '../decorators';
import { Repository } from '../repository';
import { Storable } from './storable';

export class Entity<
  IDKey extends PropertyKey = string,
  ID = any
> extends Storable {
  // TODO: check to be writable
  @enumerable(false)
  private __col__: Array<string> = [];

  @enumerable(false)
  private __idCol__?: IDKey;

  @enumerable(false)
  private __idValue__?: ID;

  constructor(
    options,
    $repository: Repository<any, any>
  ) {
    super($repository);

    if (this.__idCol__) {
      Reflect.deleteProperty(this, '__idValue__');
      Reflect.defineProperty(this, '__idValue__', {
        value: options[this.__idCol__],
        writable: true,
        enumerable: false
      });

      Reflect.deleteProperty(this, this.__idCol__);
      Reflect.defineProperty(this, this.__idCol__, {
        get: () => this.__idValue__,
        set: v => this.__idValue__ = v,
        enumerable: true
      });
    }
  }

  @enumerable(false)
  public $save(): Promise<void> {
    /* TODO */
    throw new Error('Method not implemented.');
  }

  @enumerable(false)
  public $delete(): Promise<void> {
    /* TODO */
    throw new Error('Method not implemented.');
  }

  public static Column(target: typeof Entity['prototype'], key: string) {
    if (!target.__col__)
      target.__col__ = [];

    target.__col__.push(key);
  }

  public static ID(target: typeof Entity['prototype'], key: PropertyKey) {
    target.__idKey__ = key;
  }
}

export const ID = Entity.ID;
