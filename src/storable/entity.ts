import { IStorable } from './istorable';
import { IRepository, Repository } from '../repository';

export class Entity<ID = any> implements IStorable {
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
}