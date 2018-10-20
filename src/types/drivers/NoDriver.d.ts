import { WebORMDriver } from '../';
export declare class NoDriver implements WebORMDriver {
    isSuitable(): boolean;
    setName(name: string): void;
    get(key: string, fetchHandler?: () => (Promise<any> | void)): any;
    add(key: string, entry: any, fetchHandler?: () => (Promise<any> | void)): Promise<boolean>;
}
