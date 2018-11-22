import { DebugType } from './module';
export declare abstract class Debugable {
    /**
     * The debug type for this class' actions
     */
    protected readonly abstract $debugType: DebugType;
    /**
     * The name of the WEBALORM connection this class uses
     */
    protected readonly abstract $connectionName: string;
    /**
     * `true` if the debug is enabled for this class
     */
    readonly $debugEnabled: boolean | "soft" | "hard";
    private readonly $logFactory;
    protected readonly $log: (message: any, force?: boolean) => void;
    protected readonly $warn: (message: any, force?: boolean) => void;
    protected readonly $error: (message: any, force?: boolean) => void;
    protected readonly $debug: (message: any, force?: boolean) => void;
}
