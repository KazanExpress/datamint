import { Connection } from '../../src';
import { Broken, Product, User } from './common';

describe('types', () => {
  it('types', () => {
    const orm = new Connection('asd', [], {
      Products: Product,
      User,
      Broken
    });

    orm.Products.add({
      id: 0,
      title: 'podguzniki',
      url: '/products'
    });

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

    orm.Broken.connection === orm;
  });
});
