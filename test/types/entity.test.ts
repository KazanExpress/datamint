import { Connection } from '../../src';
import { Broken, Product, User, IUser, IProduct } from './common';

describe('types', () => {
  it('types', () => {
    const orm = new Connection('asd', [], {
      Products: Product,
      User,
      Broken
    }, {
      User: {
        async create(ormOptions: IUser, { username }: { username: string; password: string }): Promise<IUser> {
          return {
            birthDate: new Date(),
            cart: [],
            name: username
          };
        },
        async delete() {
          return {
            birthDate: new Date(),
            cart: [],
            name: 'asd'
          };
        },
        update: undefined,
        read: undefined
      },
      Products: {
        async add(options: IProduct, apiKey: string) {
          return options;
        },
        async get(options: IProduct) {
          return options;
        },
        update: undefined,
        delete: undefined,
        updateById: undefined,
        count: undefined
      },
      Broken: {
        async create() {
          return new Broken();
        },
        async delete() {
          return new Broken();
        },
        async update() {
          return new Broken();
        },
      }
    });

    const podguznik = {
      id: 0,
      title: 'podguznik',
      url: '/products'
    };

    orm.Products.add(podguznik, 'asdasd');
    orm.Products.get(0);

    orm.Products.update({
      id: 0,
      title: 'Cool Podguzninki for cool kids!'
    });

    orm.Products.updateById(0, product => ({
      url: `/products/${product.id}`
    }));

    orm.Products.delete(0);

    expect(orm.User.name).toBe('User');

    orm.User.create({
      name: 'max',
      birthDate: new Date,
      cart: []
    }, {
      username: 'max',
      password: 'sadasdasd'
    });

    (async () =>
      orm.User.update({
        cart: [
          await orm.Products.get(0).result
        ]
      })
    )();

    orm.User.delete();

    expect(typeof orm.Broken.name).toBe('string');
    expect(orm.Broken.name).toBe('Broken');

    expect(orm.Broken.API!.create()).toMatchObject(new Broken());
  });
});
