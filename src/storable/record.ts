import { enumerable } from '../decorators';
import { Repository } from '../repository';
import { Storable } from './storable';

export class Record extends Storable {
  constructor(
    __options,
    $repository: Repository<any, any>
  ) {
    super(__options, $repository);
  }

  @enumerable(false)
  public async $save(): Promise<void> {
    await this.$repository.$currentDriver
      .updateOne(
        this.$repository,
        0,
        (_) => this
      );
  }

  @enumerable(false)
  public async $delete(): Promise<void> {
    await this.$repository.$currentDriver
      .deleteOne(
        this.$repository,
        0
      );
  }

  public __test: number = 0;
}
