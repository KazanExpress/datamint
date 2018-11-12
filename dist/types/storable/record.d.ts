import { Repository } from '../repository';
import { Storable } from './storable';
export declare class Record extends Storable {
    constructor(options: any, $repository: Repository<any, any, any>);
    $save(): Promise<void>;
    $delete(): Promise<void>;
}
