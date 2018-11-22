import { Record } from '../../..';
import { Product } from './product';

export interface IUserOptions {
  name: string;
  birthDate: Date;
  cart: Product[];
}

export class User extends Record implements IUserOptions {
  public name: string;

  public birthDate: Date;

  public cart: Product[];

  constructor(options: IUserOptions, repo?) {
    super(options, repo);
    this.name = options.name;
    this.birthDate = options.birthDate;
    this.cart = options.cart;
  }
}
