import { Entity } from '../../src';

export class Product extends Entity<'id', number> {
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

export interface IUser {
  name: string;
  birthDate: Date;
  cart: Product[];
}

export class User extends Entity<'name', string> implements IUser {
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
