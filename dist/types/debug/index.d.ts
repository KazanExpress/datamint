import { Debugable } from './debugable';
import { DebugType } from './module';
declare class GlobalDebug extends Debugable {
    protected readonly debugType: DebugType;
    readonly connectionName: string;
    private constructor();
    static readonly instance: GlobalDebug;
    $log: Debugable['$log'];
    $warn: Debugable['$warn'];
    $error: Debugable['$error'];
    $debug: Debugable['$debug'];
    readonly map: Partial<{
        [key: string]: boolean | "soft" | "hard";
    }>;
    readonly state: import("./module").DebugState;
}
export declare const Debug: GlobalDebug;
export * from './debugable';
export * from './module';
