import { SaveableEntity } from '../../../src/storable/entity';

export interface IProductOptions {
  id: number;
  title: string;
}

export class Product extends SaveableEntity<'id', IProductOptions['id']> implements IProductOptions {
  // Entirely optional
  // @Product.ID
  public id: number;

  @Product.Property
  public title: string;

  public readonly url: string;

  constructor(options: IProductOptions, ...args) {
    super(options, ...args);
    this.id = options.id;
    this.title = options.title;
    this.url = `/product/${this.id}-${this.title}`;
  }
}
