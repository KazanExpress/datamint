import { Connection, EntityRepository, RecordRepository, RemoteRepository } from '../../src';
import { ProductApiMap, UserApiMap } from '../common/api';
import { Product, Remote, User } from '../common/models';


describe('types', () => {
  it('types', async () => {
    Connection.$debug(true);

    const orm = new Connection('test-connection', {
      Products: EntityRepository ({
        model: Product,
        api: new ProductApiMap()
      }),
      User: RecordRepository ({
        model: User,
        api: new UserApiMap()
      }),
      Remote: RemoteRepository ({
        model: Remote,
        api: {
          async create() {
            return Promise.resolve(new Remote());
          },
          async delete() {
            return Promise.resolve(new Remote());
          },
          async update() {
            return Promise.resolve(new Remote());
          },
        }
      })
    });

    const products = orm.Products;

    expect(products.primaryKey).toBe('id');
    expect(products.columns).toContain('id');
    expect(products.columns).toContain('title');

    const user = orm.User;
    const remote = orm.Remote.API;

    orm.Pupuska!;

    const podguznik = {
      id: 0,
      title: 'podguznik',
      url: '/product/0-podguznik' // Doesn't actually count, for test checks only
    };

    await products.add(podguznik, 'asdasd');
    await products.add(podguznik, false);

    expect((await products.get(0)).result).toMatchObject(podguznik);

    try {
      await products.update({
        id: 0,
        title: 'Cool Podguzninki for cool kids!'
      });
    } catch (e) { }

    try {
      await products.updateById(0, _ => ({
        title: 'Wow, pampers'
      }));
    } catch (e) { }

    try {
      await products.delete(0);
    } catch (e) { }

    expect(user.name).toBe('User');

    try {
      await user.create({
        name: 'max',
        birthDate: new Date,
        cart: []
      }, {
        username: 'max',
        password: 'sadasdasd'
      });
    } catch (e) { }

    try {
      await user.update({
        cart: [
          (await orm.Products.get(0)).result || new Product(podguznik)
        ]
      });
    } catch (e) { }

    try {
      await user.delete();
    } catch (e) { }

    expect(typeof orm.Remote.name).toBe('string');
    expect(orm.Remote.name).toBe('Remote');

    expect(await remote.create()).toMatchObject(new Remote());
  });
});
