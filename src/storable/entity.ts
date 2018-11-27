import { enumerable } from '../decorators';
import { Repository } from '../repository';
import { Storable } from './storable';

const defaultIdAliases = [
  'id', 'ID', 'Id', '_id', '_ID', '_Id', '__id', '__ID', '__Id', '__id__', '__ID__', '__Id__'
];

export class Entity<
  IDKey extends PropertyKey = string,
  ID extends PropertyKey = any
> extends Storable {
  @enumerable(false)
  private static __idKey__?: PropertyKey;

  @enumerable(false)
  private __idValue__?: ID;

  constructor(
    __options,
    $repository: Repository<any, any>
  ) {
    super(__options, $repository);

    const constructor = (this.constructor as typeof Entity);

    if (!constructor.__idKey__) {
      const key = Object.keys(this).find(key => defaultIdAliases.some(a => a === key));

      constructor.__idKey__ = key as IDKey;
    }

    if (constructor.__idKey__) {
      Reflect.deleteProperty(this, '__idValue__');
      Reflect.defineProperty(this, '__idValue__', {
        value: __options[constructor.__idKey__],
        writable: true,
        enumerable: false
      });

      Reflect.deleteProperty(this, constructor.__idKey__);
      Reflect.defineProperty(this, constructor.__idKey__, {
        get: () => this.__idValue__,
        set: v => this.__idValue__ = v,
        enumerable: true
      });
    }
  }

  @enumerable(false)
  public async $save(): Promise<void> {
    const constructor = (this.constructor as typeof Entity);

    await this.$repository.$currentDriver
      .updateOne(
        this.$repository,
        constructor.__idKey__ ? this[constructor.__idKey__] : '',
        (_) => this
      );
  }

  @enumerable(false)
  public async $delete(): Promise<void> {
    const constructor = (this.constructor as typeof Entity);

    await this.$repository.$currentDriver
      .deleteOne(
        this.$repository,
        constructor.__idKey__ ? this[constructor.__idKey__] : ''
      );
  }

  public static ID(target: typeof Entity['prototype'], key: PropertyKey) {
    const constructor = (this.constructor as typeof Entity);

    constructor.__idKey__ = key;
  }
}

export const ID = Entity.ID;
