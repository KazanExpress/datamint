import { IRepoData } from '../repository';
import { Driver } from './base';

/**
 * @todo refactor, code is a mess
 */
export class FallbackDriver extends Driver {
  public async create<A, R extends IRepoData>({ primaryKey, name }: R, data: A): Promise<A> {
    if (!this.repositoryMap[name]) {
      if ({ primaryKey, name }.primaryKey) {
        this.repositoryMap[name] = {};
      } else {
        this.repositoryMap[name] = [];
      }
    }

    const repo: Array<A> | { [key: string]: A } = this.repositoryMap[name];

    if (primaryKey && !Array.isArray(repo)) {
      const key = String(data[primaryKey]);

      repo[key] = data;
    } else if (Array.isArray(repo)) {
      repo.push(data);
    }

    return data;
  }

  public async findById<A, R extends IRepoData>({ primaryKey, name }: R, id: PropertyKey) {
    const repo: Array<A> | { [key: string]: A } = this.repositoryMap[name];

    if (primaryKey) {
      if (Array.isArray(repo)) {
        return repo.find(i => i[primaryKey] === id);
      } else {
        if (primaryKey) {
          let result: A | undefined = repo[String(id)];

          if (!result) {
            result = Object.values(repo).find(i => i[primaryKey] === id);
          }

          return result;
        } else if (id) {
          return repo[String(id)];
        }
      }
    } else if (Array.isArray(repo)) {
      return repo[id];
    }

    return Object.values(repo)[0];
  }

  public async update<A, R extends IRepoData>(
    { name }: R,
    data: Partial<A>
  ): Promise<Array<A>> {
    throw new Error('Method not implemented.');

    return [] as Array<A>;
  }

  public async updateOne<A extends object, R extends IRepoData>(
    { name, primaryKey }: R,
    id: PropertyKey,
    query: ((entity: A) => Partial<A>) | Partial<A>
  ): Promise<A | undefined> {
    const repo = this.repositoryMap[name];

    let res: A | undefined = undefined;

    const mixInQuery = (obj: A): A => typeof query === 'function' ? (
        { ...obj as object, ...query(obj) as object } as A
      ) : (
        { ...obj as object, ...query as object } as A
      );

    if (primaryKey) {
      if (Array.isArray(repo)) {
        const idx = repo.findIndex(i => i[primaryKey] === id);

        if (idx === -1) {
          this.$error(`No entity by id ${String(id)} was found`);

          return res;
        }

        repo[idx] = res = mixInQuery(repo[idx]);
      } else {
        repo[id] = res = mixInQuery(repo[id]);
      }
    } else if (Array.isArray(repo) && typeof id === 'number') {
      repo[id] = res = mixInQuery(repo[id]);
    } else {
      this.$error(`Id ${String(id)} is of the wrong type ${typeof id}`);
    }

    return res;
  }

  public async deleteOne<A, R extends IRepoData>({ name, primaryKey }: R, id: PropertyKey): Promise<A | undefined> {
    const repo = this.repositoryMap[name];

    let res: A;

    if (primaryKey) {
      if (Array.isArray(repo)) {
        const idx = repo.findIndex(i => i[primaryKey] === id);

        res = repo[idx];

        repo.splice(idx, 1);
      } else {
        res = repo[id];

        repo[id] = undefined;
        delete repo[id];
      }
    } else if (Array.isArray(repo) && typeof id === 'number') {
      res = repo[id];

      repo.splice(id, 1);
    } else {
      throw new Error(`Id ${String(id)} is of the wrong type ${typeof id}`);
    }

    return res;
  }

  public async delete<A, R extends IRepoData>({ name, primaryKey }: R, entity: Partial<A>): Promise<Array<A>> {
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

  private repositoryMap: any = {};
}
