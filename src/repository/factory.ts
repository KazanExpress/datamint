import { Debug } from '../debug';
import { Connection } from '../orm/connection';
import { Entity, IStorable, IStorableConstructor, Record } from '../storable';
import { Repository } from './base';
import { EntityRepository } from './entityRepository';
import { RecordRepository } from './recordRepository';

export function makeRepository<
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
>(name: string, connection: Connection<any>, data: C) {
  if (data.prototype instanceof Entity) {
    return new EntityRepository<C, E, any, any, any>(name, connection, data);
  } else if (data.prototype instanceof Record) {
    return new RecordRepository<C, E>(name, connection, data);
  } else {
    Debug.error(connection.name, 'db', `No suitable repository found for ${data.name} when trying to connect with ${name}.`);

    return new Repository<C, E>(name, connection, data);
  }
}
