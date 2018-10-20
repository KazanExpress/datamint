import { WebORMDriver } from './';
export default class Entry {
    private driver;
    private path;
    value: any;
    private fetchHandler;
    constructor(driver: WebORMDriver, path: string, value: any, fetchHandler?: () => (Promise<any> | void));
    sync(): Promise<{}>;
}
