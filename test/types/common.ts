import { Entity, ID, Column, Record, ApiMap, IStorable } from '../../src';

export class Product extends Entity<'id', number> {
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

export interface IUser {
  name: string;
  birthDate: Date;
  cart: Product[];
}

export class User extends Record implements IUser {
  public name: string;

  public birthDate: Date;

  public cart: Product[];

  constructor(options: IUser) {
    super();
    this.name = options.name;
    this.birthDate = options.birthDate;
    this.cart = options.cart;
  }
}

export class Broken {
  public brokenProperty = 'broken';
}
