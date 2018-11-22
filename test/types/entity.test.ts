import { Connection } from '../../src';
import { IProductOptions, Product, User, Broken, IUserOptions } from '../common/models';

describe('types', () => {
  it('types', async () => {
    const orm = new Connection('asd', [], {
      Products: Product,
      User,
      Broken
    }, {
      User: {
        async create(ormOptions: IUserOptions, { username }: { username: string; password: string }): Promise<IUserOptions> {
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
        async add(options: IProductOptions, apiKey: string) {
          return options;
        },
        async get(options: IProductOptions) {
          return options;
        },
        update: undefined,
        delete: undefined,
        updateById: undefined,
        count: undefined
      },
      Broken: {
        async create() {
          return Promise.resolve(new Broken());
        },
        async delete() {
          return Promise.resolve(new Broken());
        },
        async update() {
          return Promise.resolve(new Broken());
        },
      }
    });

    const podguznik = {
      id: 0,
      title: 'podguznik',
      url: '/products'
    };

    orm.Products.add(podguznik, 'asdasd');

    try {
      orm.Products.get(0);
    } catch (e) { }

    try {
      orm.Products.update({
        id: 0,
        title: 'Cool Podguzninki for cool kids!'
      });
    } catch (e) { }

    try {
      orm.Products.updateById(0, product => ({
        url: `/products/${product.id}`
      }));
    } catch (e) { }

    try {
      orm.Products.delete(0);
    } catch (e) { }

    expect(orm.User.name).toBe('User');

    try {
      orm.User.create({
        name: 'max',
        birthDate: new Date,
        cart: []
      }, {
        username: 'max',
        password: 'sadasdasd'
      });
    } catch (e) { }

    try {
      orm.User.update({
        cart: [
          await orm.Products.get(0).result
        ]
      });
    } catch (e) { }

    try {
      orm.User.delete();
    } catch (e) { }

    expect(typeof orm.Broken.name).toBe('string');
    expect(orm.Broken.name).toBe('Broken');

    expect(await orm.Broken.API.create()).toMatchObject(new Broken());
  });
});
