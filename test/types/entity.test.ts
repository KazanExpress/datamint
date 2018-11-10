import { Connection, Entity } from '../../src';
import { Product, User } from './common';

describe('types', () => {
  it('types', () => {
    
    const orm = new Connection('asd', [], {
      Products: Product,
      User
    });

    orm.User.add({
      name: 'max',
      birthDate: new Date(),
      cart: [
        new Product({
          id: 0,
          title: 'podguzniki',
          url: '/package.json'
        })
      ]
    });

    orm.User.update({
      // name: 'max',
      // tslint:disable-next-line:no-magic-numbers
      birthDate: new Date(new Date().getUTCMilliseconds() - 10000)
    });

    orm.User.updateById('max', user => ({
      cart: user.cart.concat([
        new Product({
          id: 1,
          title: 'Igrushka',
          url: '/package-lock.json'
        })
      ])
    }));

    orm.Products.delete(1);

    orm.Products.update({
      id: 0,
      title: 'Pupka'
    });
  });
});