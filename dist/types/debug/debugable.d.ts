import { DebugType, LogLevel } from './module';
export declare abstract class Debugable {
    /**
     * The debug type for this class' actions
     */
    protected readonly abstract debugType: DebugType;
    /**
     * The name of the WebRM connection this class uses
     */
    protected readonly abstract connectionName: string;
    /**
     * `true` if the debug is enabled for this class
     */
    readonly debugEnabled: boolean | "soft" | "hard";
    protected readonly logFactory: (level: LogLevel) => (message: any) => void;
    protected readonly log: (message: any) => void;
    protected readonly warn: (message: any) => void;
    protected readonly error: (message: any) => void;
    protected readonly debug: (message: any) => void;
}
