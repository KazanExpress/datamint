import { Connection, Column, ID, Entity } from '../src';

describe('types', () => {
  it('types', () => {
    class Product extends Entity<number> {
      @ID
      @Column
      public id: number;

      @Column
      public title: string;

      @Column
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

    class User extends Entity<string> implements IUser {
      @ID
      @Column
      public name: string;

      @Column
      public birthDate: Date;

      @Column
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