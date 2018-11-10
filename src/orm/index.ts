import { IDriverConstructor } from '../drivers';
import { Entity } from '../entity';
import { WebOrm, IRepositoryMap, RepoStore } from './constructor';

export const WebORM = WebOrm as {
  /**
   * Creates an instance of WebOrm.
   * @param connectionName the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current entity structure
   */
  new <T extends IRepositoryMap>(
      connectionName: string,
      drivers: IDriverConstructor[],
      repositories: T,
      apiMap?: any // TODO
  ): WebOrm<T> & RepoStore<T>;
} & typeof WebOrm;

export type WebORM<T extends IRepositoryMap = any> = WebOrm<T>;

export * from './namespace';

class Product extends Entity {
  constructor(title: string, url: string) {
    super();
  }
}

class User extends Entity {
  constructor(name: string, birthDate: Date, cart: Product[]) {
    super();
  }
}

const orm = new WebORM('asd', [], {
  Products: Product,
  Users: User
});

orm.Users.add('max', new Date(), [ new Product('podguzniki', '/package.json') ]);
