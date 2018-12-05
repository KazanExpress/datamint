import { FallbackDriver } from '../drivers';
import { QueryResult } from '../queryResult';
import { Repository, selectDriver } from './base';
/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
export class RecordRepositoryClass extends Repository {
    constructor(name, connectionName, currentDriver, record, api) {
        super(name, connectionName, record, api);
        this.currentDriver = currentDriver;
    }
    async create(options, apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    async update(options, apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    async read(apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    async delete(apiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
}
export function RecordRepository(options) {
    return (name, connection) => new RecordRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api);
}
//# sourceMappingURL=record.js.map