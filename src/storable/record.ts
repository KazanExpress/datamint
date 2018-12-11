import { DebugInstance, DebugType } from '../debug';
import { enumerable } from '../decorators';
import { RecordRepositoryClass } from '../repository/record';
import { IActiveRecord, Storable } from './base';

export class Record extends Storable {
  constructor(options: any, ...args: any[]) { super(options, ...args); }
}

export class SaveableRecord extends Record implements IActiveRecord {
  @enumerable(false)
  private readonly __debug: DebugInstance;
  @enumerable(false)
  private readonly __repo?: RecordRepositoryClass<any, any, this, any>;

  @enumerable(false)
  private __contextWarning(optional: string = '') {
    this.__debug.$warn(`Seems like the record "${
      this.constructor.name
    }" was initialized in a wrong context.\n${optional}`);
  }

  constructor(options, repo?: RecordRepositoryClass<any, any, any, any>) {
    super(options, repo);

    if (repo) {
      this.__repo = repo;

      this.__debug = new DebugInstance(
        `db:${repo.name}:entity` as DebugType,
        this.__repo.connectionName
        );
    } else {
      this.__debug = new DebugInstance('*', '');
      this.__contextWarning();
    }
  }

  public $save() {
    if (!this.__repo) {
      this.__contextWarning('Saving cannot be done.');

      return Promise.resolve(undefined);
    }

    return this.__repo.update(this)
      .then(r => r.result)
      .catch(e => { throw e; });
  }

  public $delete(): Promise<this | undefined> {
    if (!this.__repo) {
      this.__contextWarning('Deletion cannot be done.');

      return Promise.resolve(undefined);
    }

    return this.__repo.delete()
      .then(r => r.result)
      .catch(e => { throw e; });
  }
}
