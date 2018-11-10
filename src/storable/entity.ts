import { IStorable } from './istorable';
import { IRepository, Repository } from '../repository';

export class Entity<ID = any> implements IStorable {
  private __col__: Array<string> = [];
  private __id__: string = '';

  constructor(options) {
    
  }

  public $setID(id: ID) {
    
  }

  public $save() {
    return Promise.resolve();
  }

  public $delete() {
    return Promise.resolve();
  }

  public static Column(target: typeof Entity['prototype'], key: string) {
    target.__col__.push(key);
  }

  public static ID(target: typeof Entity['prototype'], key: string) {
    target.__id__ = key;
  }
}