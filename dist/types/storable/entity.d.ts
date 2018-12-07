import { IEntityRepository } from '../repository/entity';
import { IActiveRecord, Storable } from './base';
declare type WithId<T, IDKey extends PropertyKey, IDValue> = T & {
    [key in IDKey]: IDValue;
};
export declare class Entity<IDKey extends PropertyKey = any, IDValue extends PropertyKey = any> extends Storable {
    protected __idKey__?: IDKey;
    protected __idValue__?: IDValue;
    constructor(options: WithId<{
        [key: string]: any;
    }, IDKey, IDValue>, ...args: any[]);
    static ID(target: Entity, key: PropertyKey): void;
}
/**
 * Enables ActiveRecord pattern for the entity
 */
export declare class SaveableEntity<IDKey extends PropertyKey = string, IDValue extends PropertyKey = any> extends Entity<IDKey, IDValue> implements IActiveRecord {
    private readonly __debug;
    private readonly __repo?;
    private __contextWarning;
    constructor(options: WithId<{
        [key: string]: any;
    }, IDKey, IDValue>, repo?: IEntityRepository<any, any, any, IDKey, IDValue>);
    $save(): Promise<this | undefined>;
    $delete(): Promise<this | undefined>;
}
export {};
