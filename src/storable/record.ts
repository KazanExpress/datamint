import { Repository } from '../repository';
import { enumerable } from '../decorators';
import { Storable } from './storable';

export class Record extends Storable {
  constructor(
    options,
    $repository: Repository<any, any, any>
  ) {
    super($repository);
  }

  @enumerable(false)
  public $save(): Promise<void> {
    /* TODO */
    throw new Error('Method not implemented.');
  }

  @enumerable(false)
  public $delete(): Promise<void> {
    /* TODO */
    throw new Error('Method not implemented.');
  }
}
