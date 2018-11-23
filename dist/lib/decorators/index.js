"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerable = (isEnumerable = true) => function (target, key, desc) {
    if (desc) {
        desc.enumerable = isEnumerable;
    }
    else {
        Reflect.deleteProperty(target, key);
        Reflect.defineProperty(target, key, {
            value: undefined,
            enumerable: isEnumerable,
            writable: true
        });
    }
};
//# sourceMappingURL=index.js.map