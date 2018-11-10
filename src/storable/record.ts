import { IStorable } from './istorable';

export class Record implements IStorable {
  public $save(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public $delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}