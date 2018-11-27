import { Entity } from '../../..';

export interface IProductOptions {
  id: number;
  title: string;
  url: string;
}

export class Product extends Entity<'id', number> implements IProductOptions {
  @Product.ID
  @Product.Property
  public id: number;

  @Product.Property
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
