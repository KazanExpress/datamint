import { IUserOptions } from './models';

export const API = {
  async createUser(username: string, password: string): Promise<IUserOptions> {
    return {
      birthDate: new Date(),
      cart: [],
      name: username
    };
  },

  async setUserData(data: IUserOptions): Promise<void> {}
};
