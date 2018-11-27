import { enumerable } from '../decorators';
import { Repository } from '../repository';
import { Storable } from './storable';

export class Entity<
  IDKey extends PropertyKey = string,
  ID extends PropertyKey = any
> extends Storable {
  @enumerable(false)
  private __idKey__?: IDKey;

  @enumerable(false)
  private __idValue__?: ID;

  constructor(
    __options,
    $repository: Repository<any, any>
  ) {
    super(__options, $repository);

    if (this.__idKey__) {
      Reflect.deleteProperty(this, '__idValue__');
      Reflect.defineProperty(this, '__idValue__', {
        value: __options[this.__idKey__],
        writable: true,
        enumerable: false
      });

      Reflect.deleteProperty(this, this.__idKey__);
      Reflect.defineProperty(this, this.__idKey__, {
        get: () => this.__idValue__,
        set: v => this.__idValue__ = v,
        enumerable: true
      });
    }
  }

  @enumerable(false)
  public async $save(): Promise<void> {
    await this.$repository.$currentDriver
      .updateOne(
        this.$repository,
        this.__idKey__ ? (this as any)[this.__idKey__] : '',
        (_) => this
      );
  }

  @enumerable(false)
  public async $delete(): Promise<void> {
    await this.$repository.$currentDriver
      .deleteOne(
        this.$repository,
        this.__idKey__ ? (this as any)[this.__idKey__] : ''
      );
  }

  public static ID(target: typeof Entity['prototype'], key: PropertyKey) {
    target.__idKey__ = key;
  }
}

export const ID = Entity.ID;
