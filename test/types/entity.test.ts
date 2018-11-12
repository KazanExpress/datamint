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
        async create({ username }: { username: string; password: string }) {
          return {
            birthDate: new Date(),
            cart: [],
            name: username
          } as IUser;
        },
        async delete() {
          return {
            birthDate: new Date(),
            cart: [],
            name: 'asd'
          };
        }
      },
      Products: {
        async create(options: { title: string; id: number; url: string }) {
          return options;
        }
      },
      Broken: undefined
    });

    const podguzniki = {
      id: 0,
      title: 'podguzniki',
      url: '/products'
    };

    orm.Products.add(podguzniki, podguzniki);

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
