import { Debug } from '../debug';
import { Connection } from '../orm/connection';
import { Entity, IStorable, IStorableConstructor, Record } from '../storable';
import { Repository } from './base';
import { EntityRepository } from './entityRepository';
import { RecordRepository } from './recordRepository';

export function makeRepository<
  T extends Connection<any>,
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
>(name: string, connection: T, data: C) {
  if (data.prototype instanceof Entity) {
    return new EntityRepository<T, C, E, any, any, any>(name, connection, data);
  } else if (data.prototype instanceof Record) {
    return new RecordRepository<T, C, E>(name, connection, data);
  } else {
    Debug.error(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`);

    return new Repository<T, C, E>(name, connection, data);
  }
}
