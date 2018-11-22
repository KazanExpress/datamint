import { Entity, Record } from '../../src';

export interface IProduct {
  id: number;
  title: string;
  url: string;
}

export class Product extends Entity<'id', number> {
  @Product.ID
  @Product.Column
  public id: number;

  @Product.Column
  public title: string;

  @Product.Column
  public url: string;

  constructor(options: IProduct, repo?) {
    super(options, repo);
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

export class User extends Record implements IUser {
  public name: string;

  public birthDate: Date;

  public cart: Product[];

  constructor(options: IUser, repo?) {
    super(options, repo);
    this.name = options.name;
    this.birthDate = options.birthDate;
    this.cart = options.cart;
  }
}

export class Broken {
  public brokenProperty = 'broken';
}
