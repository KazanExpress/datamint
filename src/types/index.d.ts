import Entry from './entry';
export * from './drivers';
export default class WebORM {
    name: string;
    driver: WebORMDriver;
    private APIMap;
    constructor(name: string, options?: IWebORMOptions);
    private initPressetData;
    getEntry(key: string): Promise<Entry>;
    addEntry(key: string, entry: any): Promise<boolean>;
}
export interface IWebORMOptions {
    drivers?: WebORMDriver[];
    preset?: {
        [key: string]: any;
    };
    APIMap?: IAPIMap;
}
export interface IAPIMap {
    [key: string]: {
        get?: () => Promise<any>;
        add?: () => (Promise<any> | void);
    };
}
export declare abstract class WebORMDriver {
    /**
     * Checks if driver can operate in current environment
     *
     * @returns is driver suitable
     */
    isSuitable(): boolean;
    setName(name: string): void;
    get(key: string, fetchHandler?: () => (Promise<any> | void)): Promise<Entry>;
    add(key: string, entry: any, fetchHandler?: () => (Promise<any> | void)): Promise<boolean>;
}
