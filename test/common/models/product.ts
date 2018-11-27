import { Entity } from '../../..';

export interface IProductOptions {
  id: number;
  title: string;
  url: string;
}

export class Product extends Entity<'id', number> {
  @Product.ID
  @Product.Property('productId')
  public id: number;

  @Product.Property('productTitle')
  public title: string;

  @Product.Property
  public url: string;

  constructor(options: IProductOptions, repo?) {
    super(options, repo);
    this.id = options.id;
    this.title = options.title;
    this.url = options.url;
  }
}
