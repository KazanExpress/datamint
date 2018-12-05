import { DebugInstance, DebugType } from '../debug';
import { enumerable } from '../decorators';
import { EntityRepositoryClass } from '../repository/entity';
import { IActiveRecord, Storable } from './base';

const defaultIdAliases = [
  'id', 'ID', 'Id', '_id', '_ID', '_Id', '__id', '__ID', '__Id', '__id__', '__ID__', '__Id__'
];

type WithId<T, IDKey extends PropertyKey, IDValue> = T & {
  [key in IDKey]: IDValue;
};

export class Entity<
  IDKey extends PropertyKey = any,
  IDValue extends PropertyKey = any
> extends Storable {
  @enumerable(false)
  protected __idKey__?: IDKey;

  @enumerable(false)
  protected __idValue__?: IDValue;

  constructor(options: WithId<{ [key: string]: any }, IDKey, IDValue>) {
    super(options);

    // If no unique ID is set for the entity
    if (!this.__idKey__) {
      const key = Object.keys(this).find(key => defaultIdAliases.some(a => a === key));

      // Auto-apply the ID decorator if found any compatible property
      if (key) {
        (this.constructor as typeof Entity).ID(this, key);
      }
    }

    if (this.__idKey__ && options[String(this.__idKey__)]) {
      Reflect.deleteProperty(this, '__idValue__');
      Reflect.defineProperty(this, '__idValue__', {
        value: options[String(this.__idKey__)],
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

  public static ID(target: Entity, key: PropertyKey) {
    target.__idKey__ = key;

    (target.constructor as typeof Entity).Property(target, key);
  }
}

/**
 * Enables ActiveRecord pattern for the entity
 */
export class SaveableEntity<
  IDKey extends PropertyKey = string,
  IDValue extends PropertyKey = any
> extends Entity<IDKey, IDValue> implements IActiveRecord {
  @enumerable(false)
  private readonly __debug: DebugInstance;
  @enumerable(false)
  private readonly __repo?: EntityRepositoryClass<any, any, this, any, IDKey, IDValue>;

  @enumerable(false)
  private __contextWarning(optional: string = '') {
    this.__debug.$warn(`Seems like the entity "${
      this.constructor.name
    }" was initialized in a wrong context.\n${optional}`, true);
  }

  constructor(options: WithId<{ [key: string]: any }, IDKey, IDValue>, repo?: EntityRepositoryClass<any, any, any, any, IDKey, IDValue>) {
    super(options);

    if (repo) {
      this.__repo = repo;

      this.__debug = new DebugInstance(
        `db:${repo.name}:entity` as DebugType,
        this.__repo.$connectionName
        );
    } else {
      this.__debug = new DebugInstance('*', '');
      this.__contextWarning();
    }
  }

  public $save() {
    if (!this.__repo) {
      this.__contextWarning('Saving cannot be done.');

      return Promise.resolve(undefined);
    }

    const idkey = this.__idKey__;

    return this.__repo.updateById(
      idkey ? this[idkey as PropertyKey] : 0,
      () => this
    ).then(r => r.result).catch(e => { throw e; });
  }

  public $delete(): Promise<this | undefined> {
    if (!this.__repo) {
      this.__contextWarning('Deletion cannot be done.');

      return Promise.resolve(undefined);
    }

    const idkey = this.__idKey__;

    return this.__repo.delete(
      idkey ? this[idkey as PropertyKey] : 0
    ).then(r => r.result).catch(e => { throw e; });
  }
}
