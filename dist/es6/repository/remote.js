import { Repository } from './base';
export class RemoteRepositoryClass extends Repository {
    get API() {
        return this.api;
    }
}
export function RemoteRepository(options) {
    return (name, connection) => new RemoteRepositoryClass(name, connection.name, options.model, options.api);
}
//# sourceMappingURL=remote.js.map