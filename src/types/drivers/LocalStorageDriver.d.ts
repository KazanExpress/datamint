import { WebORMDriver } from '../';
export declare class LocalStorageDriver implements WebORMDriver {
    private name;
    isSuitable(): boolean;
    setName(name: string): void;
    get(key: string, fetchHandler?: () => (Promise<any> | void)): any;
    add(key: string, entry: any, fetchHandler?: () => (Promise<any> | void)): Promise<boolean>;
    private setDeepVal;
    private getRootFromPath;
}
