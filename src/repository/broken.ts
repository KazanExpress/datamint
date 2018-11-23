import { BrokenDataMap } from '../apiMap';
import { Repository } from './base';

export class BrokenRepository<DM extends BrokenDataMap<any>> extends Repository<DM, any> {
  public get API() {
    return this.api!;
  }
}
