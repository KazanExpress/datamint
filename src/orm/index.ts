import { IDriverConstructor } from '../drivers';
import { Entity } from '../storable/entity';
import { Connection as connection, IRepositoryMap, RepoStore } from './constructor';

export const Connection = connection as {
  /**
   * Creates an instance of WebOrm.
   * @param name the name of the connection to the storage. Namespaces all respositories invoked from the instance.
   * @param drivers determine a variety of drivers the orm can select from. The first one that fits for the environment is selected.
   * @param repositories sets the relation of a repository name to its contents' prototype.
   * @param apiMap maps the API calls onto the current entity structure
   */
  new <T extends IRepositoryMap>(
      name: string,
      drivers: IDriverConstructor[],
      repositories: T,
      apiMap?: any // TODO
  ): connection<T> & RepoStore<T>;
} & typeof connection;

export type Connection<T extends IRepositoryMap = any> = connection<T>;

export * from './namespace';

class Product extends Entity {
  constructor(options: {
      title: string;
      url: string;
  }) {
    super(options);
  }
}

class User extends Entity {
  constructor(options: {
    name: string;
    birthDate: Date;
    cart: Product[];
  }) {
    super(options);
  }
}

const orm = new Connection('asd', [], {
  Products: Product,
  User
});

orm.User.add({
  name: 'max',
  birthDate: new Date(),
  cart: [
    new Product({
      title: 'podguzniki',
      url: '/package.json'
    })
  ]
});


orm.User.update(0, {
  
});

orm.Products.delete(1);