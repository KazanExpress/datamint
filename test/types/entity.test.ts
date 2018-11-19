import { Connection } from '../../src';
import { Broken, Product, User, IUser } from './common';

describe('types', () => {
  it('types', () => {
    const orm = new Connection('asd', [], {
      Products: Product,
      User,
      Broken
    }, {
      User: {
        'create': async function ({ username }: { username: string; password: string }) {
          return {
            birthDate: new Date(),
            cart: [],
            name: username
          } as IUser;
        },
        'delete': async function () {
          return {
            birthDate: new Date(),
            cart: [],
            name: 'asd'
          };
        }
      },
      Products: {
        async add(options: { title: string; id: number; url: string }) {
          return options;
        },
        async get(options: { title: string; id: number; url: string }) {
          return options;
        },
        cluster: {}
      },
      Broken: undefined
    });

    const podguznik = {
      id: 0,
      title: 'podguznik',
      url: '/products'
    };

    orm.Products.add(podguznik, podguznik);
    orm.Products.get(0, podguznik);

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
    });

    (async () =>
      orm.User.update({
        cart: [
          await orm.Products.get(0).result
        ]
      })
    )();

    orm.User.delete();

    typeof orm.Broken.name === 'string';
  });
});
