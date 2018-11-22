import { IUserOptions } from './models';

export const Max: IUserOptions = {
  name: 'max',
  // tslint:disable-next-line:no-magic-numbers
  birthDate: new Date(Date.UTC(1997, 8, 9)),
  cart: []
};

export const API = {
  user: {
    async createUser(username: string, password: string): Promise<IUserOptions> {
      return Max;
    },

    async setUserData(data: IUserOptions): Promise<boolean> {
      return true;
    }
  }
};
