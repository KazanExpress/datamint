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
