import { EntityDataMap, RecordDataMap } from '../apiMap';
import { print } from '../debug';
import { Entity, IStorableConstructor, Record, Storable } from '../storable';
import { IRepoConnection } from './base';
import { BrokenRepository } from './broken';
import { EntityRepository } from './entity';
import { RecordRepository } from './record';

export function makeRepository<
  DM extends EntityDataMap<C, A> | RecordDataMap<C, A>,
  C extends IStorableConstructor<E>,
  E extends Storable = InstanceType<C>,
  A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0],
>(
  name: string,
  connection: IRepoConnection<DM>,
  data: C
): DM extends EntityDataMap<C> ? (
  E extends Entity ? EntityRepository<DM, C, E, A> : BrokenRepository<DM>
) : DM extends RecordDataMap<C> ? (
  E extends Record ? RecordRepository<DM, C, E, A> : BrokenRepository<DM>
) : BrokenRepository<DM> {
  let Repo: any = BrokenRepository;

  if (data.prototype instanceof Entity) {
    Repo = EntityRepository;
  } else if (data.prototype instanceof Record) {
    Repo = RecordRepository;
  } else {
    print(
      connection.name,
      'db',
      `No suitable repository found for "${data.name}".`,
      'error'
    );
  }

  return new Repo(name, connection, data);
}
