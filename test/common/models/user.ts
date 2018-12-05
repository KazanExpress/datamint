import { SaveableRecord } from '../../../src/storable/record';
import { Product } from './product';

export interface IUserOptions {
  name: string;
  birthDate: Date;
  cart: Product[];
}

export class User extends SaveableRecord implements IUserOptions {
  @User.Property
  public name: string;

  @User.Property
  public birthDate: Date;

  @User.Property
  public cart: Product[];

  constructor(options: IUserOptions, ...args) {
    super(options, ...args);
    this.name = options.name;
    this.birthDate = options.birthDate;
    this.cart = options.cart;
  }
}
