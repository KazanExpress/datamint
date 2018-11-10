import { Connection, Entity } from '../src';

describe('types', () => {
  it('types', () => {
    class Product extends Entity<number> {
      @Entity.ID
      @Entity.Column
      public id: number;

      @Entity.Column
      public title: string;

      @Entity.Column
      public url: string;

      constructor(options: {
        id: number;
        title: string;
        url: string;
      }) {
        super(options);
        this.id = options.id;
        this.title = options.title;
        this.url = options.url;
      }
    }

    interface IUser {
      name: string;
      birthDate: Date;
      cart: Product[];
    }

    class User extends Entity<'name', string> implements IUser {
      @Entity.ID
      @Entity.Column
      public name: string;

      @Entity.Column
      public birthDate: Date;

      @Entity.Column
      public cart: Product[];

      constructor(options: IUser) {
        super(options);
        this.name = options.name;
        this.birthDate = options.birthDate;
        this.cart = options.cart;
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
  });
});