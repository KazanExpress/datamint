import { Entity } from '../../..';
import { EntityDataMap } from '../../../src/apiMap';
import { JsonAPIClient } from 'kefetchup/src';

export interface IProductOptions {
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

  constructor(options: IProductOptions, repo?) {
    super(options, repo);
    this.id = options.id;
    this.title = options.title;
    this.url = options.url;
  }
}

export class ProductApiMap extends JsonAPIClient implements EntityDataMap<typeof Product, any> {
  constructor() {
    super('https://kazanexpress.ru', {
      headers: {
        Authorization: 'basic asdasd'
      }
    });
  }

  public async add(options: IProductOptions, apiKey: string) {
    return options;
  }

  public async get(options: IProductOptions) {
    return options;
  }

  public update;
  public delete;
  public updateById;
  public count;
}
