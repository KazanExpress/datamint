import { BrokenDataMap } from '../apiMap';
import { Repository } from './base';
export declare class BrokenRepository<DM extends BrokenDataMap<any>> extends Repository<DM, any> {
    readonly API: DM | undefined;
}
