import { Debug } from '../debug';
import { Driver } from '../drivers';
import { ApiDriver } from '../drivers/api';
import { Entity, IStorable, IStorableConstructor, Record } from '../storable';
import { Repository } from './base';
import { EntityRepository } from './entityRepository';
import { RecordRepository } from './recordRepository';
import { DataMap } from '../apiMap';

export function makeRepository<
  DM extends DataMap<any>,
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
>(
  name: string,
  connection: {
    name: string;
    currentDriver: Driver;
    apiDriver?: ApiDriver;
  },
  data: C
): E extends Entity ? EntityRepository<DM, C, E> : E extends Record ? RecordRepository<DM, C, E> : Repository<DM, C, E> {
  let Constructor: any;

  if (data.prototype instanceof Entity) {
    Constructor = EntityRepository;
  } else if (data.prototype instanceof Record) {
    Constructor = RecordRepository;
  } else {
    Debug.error(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`);

    Constructor = Repository;
  }

  return new Constructor(name, connection, data);
}
