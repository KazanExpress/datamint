import { Storable } from './storable';
import { Repository } from '../repository';

export class Record extends Storable {
  constructor(
    options,
    $repository: Repository<any, any, any>
  ) {
    super($repository);
  }

  public $save(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public $delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
