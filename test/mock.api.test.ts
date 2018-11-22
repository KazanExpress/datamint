import { API, Max } from './common/api';

describe('mock.api', () => {
  it('resolves user objects', async () => {
    expect(await API.user.createUser(Max.name, 'asdsad')).toMatchObject(Max);

    expect(await API.user.setUserData(Max)).toBe(true);
  });
});
