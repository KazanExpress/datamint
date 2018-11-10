import { IStorable } from './istorable';

export class Entity<ID = any> implements IStorable {
  constructor(options) {
    
  }

  public repository;

  public $save() {
    return Promise.resolve();
  }

  public $delete() {
    return Promise.resolve();
  }
}