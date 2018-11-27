import { UserApiMap, createUser } from './common/api';
import { IUserOptions } from './common/models';

describe('mock.api', () => {
  it('resolves user objects', async () => {
    expect(await new UserApiMap().create(createUser(), {
      username: createUser().name,
      password: 'asdsad'
    })).toMatchObject(createUser());

    expect(((await new UserApiMap().update({
      name: 'John Smith'
    })) as IUserOptions).name).toBe('John Smith');

    expect(await new UserApiMap().read()).toMatchObject({
      name: 'John Smith',
      birthDate: createUser().birthDate,
      cart: []
    } as IUserOptions);
  });
});
