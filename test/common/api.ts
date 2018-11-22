import { IUserOptions, Product } from './models';

export const Max: IUserOptions = {
  name: 'max',
  // tslint:disable-next-line:no-magic-numbers
  birthDate: new Date(Date.UTC(1997, 8, 9)),
  cart: []
};

const DB = {
  USER: null as IUserOptions | null,
  PRODUCTS: [] as Product[],
};

export const API = {
  user: {
    async createUser(username: string, password: string): Promise<IUserOptions> {
      DB.USER = Max;
      DB.USER.name = username;

      return DB.USER;
    },

    async setUserData(data: Partial<IUserOptions>): Promise<boolean> {
      if (DB.USER) {
        for (const key in DB.USER) if (data[key]) {
          DB.USER[key] = data[key];
        }

        return true;
      }

      return false;
    },

    async getUser() {
      return Promise.resolve(DB.USER);
    }
  }
};
