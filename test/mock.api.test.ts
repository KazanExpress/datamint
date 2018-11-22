import { API, Max } from './common/api';
import { IUserOptions } from './common/models';

describe('mock.api', () => {
  it('resolves user objects', async () => {
    expect(await API.user.createUser(Max.name, 'asdsad')).toMatchObject(Max);

    expect(await API.user.setUserData({
      name: 'John Smith'
    })).toBe(true);

    expect(await API.user.getUser()).toMatchObject({
      name: 'John Smith',
      birthDate: Max.birthDate,
      cart: []
    } as IUserOptions);
  });
});
