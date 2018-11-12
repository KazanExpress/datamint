import { DataMap } from '../drivers/api';
import { Repository } from '../repository';
import { Debugable } from '../debug';

export type IStorableConstructor<E extends Storable> = new (options, $repository) => E;

export abstract class Storable extends Debugable {
  protected debugType: string = `db:${this.$repository.name}:entity`;
  public connectionName: string = this.$repository.connectionName;

  constructor(
    public readonly $repository: Repository<DataMap<any>, IStorableConstructor<any>, any>
  ) { super(); }

  public abstract $save(): Promise<void>;
  public abstract $delete(): Promise<void>;
}
