import { Repository } from '../repository';
import { Enumerable } from '../util';
import { Storable } from './storable';

export class Record extends Storable {
  constructor(
    options,
    $repository: Repository<any, any, any>
  ) {
    super($repository);
  }

  @Enumerable(false)
  public $save(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  @Enumerable(false)
  public $delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
