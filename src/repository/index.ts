import { Debug } from '../debug';
import { Connection } from '../orm';
import { Entity, IStorable, IStorableConstructor, Record } from '../storable';
import { EntityRepository } from './entityRepository';
import { RecordRepository } from './recordRepository';

/**
 * @TODO:
 * - Async API MAP crap for handling QueryResults
 */

export class Repository<
  C extends IStorableConstructor<E>,
  E extends IStorable = InstanceType<C>,
> {
  constructor(
    public name: string,
    public readonly connection: Connection<any>,
    protected Data: C
  ) {
    if (
      // If this class was instantiated directly (without inheritance)
      Repository.prototype === this.constructor.prototype

      // And set debug for db:[name]
      && Debug.map[`db:${name}`]
    ) {
      Debug.warn(connection.name, `db:${name}`, `Using default empty repository for ${name}`);
    }
  }
}

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

export * from './entityRepository';

