"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerable = (isEnumerable = true) => function (target, key, desc) {
    let descriptor = Object.getOwnPropertyDescriptor(target, key) || {};
    if (descriptor.enumerable != isEnumerable) {
        descriptor.enumerable = isEnumerable;
        Object.defineProperty(target, key, descriptor);
    }
};
//# sourceMappingURL=index.js.map