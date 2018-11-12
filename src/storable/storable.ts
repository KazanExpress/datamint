import { Debugable, DebugType } from '../debug';
import { DataMap } from '../drivers/api';
import { Repository } from '../repository';

export type IStorableConstructor<E extends Storable> = new (options, $repository) => E;

export abstract class Storable extends Debugable {
  protected $debugType: DebugType = `db:${this.$repository.name}:entity` as DebugType;
  public $connectionName: string = this.$repository.$connectionName;

  constructor(
    public readonly $repository: Repository<DataMap<any>, IStorableConstructor<any>, any>
  ) { super(); }

  public abstract $save(): Promise<void>;
  public abstract $delete(): Promise<void>;
}
