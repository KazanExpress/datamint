import { UserApiMap, create } from './common/api';
import { IUserOptions } from './common/models';

describe('mock.api', () => {
  it('resolves user objects', async () => {
    expect(await new UserApiMap().create(create(), {
      username: create().name,
      password: 'asdsad'
    })).toMatchObject(create());

    expect(((await new UserApiMap().update({
      name: 'John Smith'
    })) as IUserOptions).name).toBe('John Smith');

    expect(await new UserApiMap().read()).toMatchObject({
      name: 'John Smith',
      birthDate: create().birthDate,
      cart: []
    } as IUserOptions);
  });
});
