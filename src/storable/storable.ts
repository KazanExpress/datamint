import { Debugable, DebugType } from '../debug';
import { enumerable } from '../decorators';
import { Repository } from '../repository';

export type IStorableConstructor<E extends Storable> = new (options, $repository) => E;

export abstract class Storable extends Debugable {
  @enumerable(false)
  protected $debugType: DebugType = `db:${this.$repository.name}:entity` as DebugType;
  @enumerable(false)
  public $connectionName: string = this.$repository.$connectionName;

  constructor(
    @enumerable(false)
    protected __options,
    @enumerable(false)
    public readonly $repository: Repository<any, any>
  ) { super(); }

  public abstract $save(): Promise<void>;
  public abstract $delete(): Promise<void>;

  @enumerable(false)
  private static __col__: Array<PropertyKey> = [];

  // TODO: make it accept optional property name to write to
  public static Property(target: typeof Storable['prototype'], key: PropertyKey) {
    const constructor = (target.constructor as typeof Storable);

    if (!constructor.__col__) {
      constructor.__col__ = [];
    }

    constructor.__col__.push(key);
  }
}

export const Property = Storable.Property;
