import { Driver } from './base';
/**
 * @todo refactor, code is a mess
 */
export class FallbackDriver extends Driver {
    constructor() {
        super(...arguments);
        this.repositoryMap = {};
    }
    async create({ primaryKey, name }, data) {
        if (!this.repositoryMap[name]) {
            if ({ primaryKey, name }.primaryKey) {
                this.repositoryMap[name] = {};
            }
            else {
                this.repositoryMap[name] = [];
            }
        }
        const repo = this.repositoryMap[name];
        if (primaryKey) {
            const key = String(data[primaryKey]);
            repo[key] = data;
        }
        else if (Array.isArray(repo)) {
            repo.push(data);
        }
        return data;
    }
    async findById({ primaryKey, name }, id) {
        const repo = this.repositoryMap[name];
        if (primaryKey) {
            if (Array.isArray(repo)) {
                return repo.find(i => i[primaryKey] === id);
            }
            else {
                if (primaryKey) {
                    let result = repo[String(id)];
                    if (!result) {
                        result = Object.values(repo).find(i => i[primaryKey] === id);
                    }
                    return result;
                }
                else if (id) {
                    return repo[String(id)];
                }
            }
        }
        else if (Array.isArray(repo)) {
            return repo[id];
        }
        return Object.values(repo)[0];
    }
    async update({ name, primaryKey }, data) {
        throw new Error('Method not implemented.');
        return [];
    }
    async updateOne({ name, primaryKey }, id, query) {
        const repo = this.repositoryMap[name];
        let res = undefined;
        const mixInQuery = (obj) => typeof query === 'function' ? Object.assign({}, obj, query(obj)) : Object.assign({}, obj, query);
        if (primaryKey) {
            if (Array.isArray(repo)) {
                const idx = repo.findIndex(i => i[primaryKey] === id);
                if (idx === -1) {
                    this.$error(`No entity by id ${String(id)} was found`);
                    return res;
                }
                repo[idx] = res = mixInQuery(repo[idx]);
            }
            else {
                repo[id] = res = mixInQuery(repo[id]);
            }
        }
        else if (Array.isArray(repo) && typeof id === 'number') {
            repo[id] = res = mixInQuery(repo[id]);
        }
        else {
            this.$error(`Id ${String(id)} is of the wrong type ${typeof id}`);
        }
        return res;
    }
    async deleteOne({ name, primaryKey }, id) {
        const repo = this.repositoryMap[name];
        let res;
        if (primaryKey) {
            if (Array.isArray(repo)) {
                const idx = repo.findIndex(i => i[primaryKey] === id);
                res = repo[idx];
                repo.splice(idx, 1);
            }
            else {
                res = repo[id];
                repo[id] = undefined;
                delete repo[id];
            }
        }
        else if (Array.isArray(repo) && typeof id === 'number') {
            res = repo[id];
            repo.splice(id, 1);
        }
        else {
            throw new Error(`Id ${String(id)} is of the wrong type ${typeof id}`);
        }
        return res;
    }
    async delete({ name, primaryKey }, entity) {
        const repo = this.repositoryMap[name];
        let res;
        // if (isEntityRepo(repository)) {
        //   const key = Object.keys(repo).findIndex(e => Object.keys(repo[e]).some(key => {
        //     return e[key] === entity[key];
        //   }));
        //   res = this.repositoryMap[repository.name][key];
        //   this.repositoryMap[repository.name][key] = undefined;
        //   delete this.repositoryMap[repository.name][key];
        // } else {
        //   res = this.repositoryMap[repository.name];
        //   this.repositoryMap[repository.name] = undefined;
        // }
        return res;
    }
}
//# sourceMappingURL=fallback.js.map