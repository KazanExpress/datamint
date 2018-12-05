import { Debugable } from './debugable';
import { debugMap, debugState } from './module';
class GlobalDebug extends Debugable {
    constructor() {
        super();
        this.$debugType = '*';
        this.$connectionName = '';
    }
    get map() {
        return debugMap;
    }
    get state() {
        return debugState;
    }
}
GlobalDebug.instance = new GlobalDebug();
export const Debug = GlobalDebug.instance;
export * from './debugable';
export * from './module';
//# sourceMappingURL=index.js.map