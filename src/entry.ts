import { WebORMDriver } from './';

export default class Entry {
  constructor(
    private driver: WebORMDriver,
    private path: string,
    public value,
    private fetchHandler: () => (Promise<any> | void) = () => {}
  ) { }

  public sync() {
    return new Promise(async (resolve, reject) => {
      let data = await this.fetchHandler();
      await this.driver.add(this.path, data);
      resolve(data);
    });
  }
}
