"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = (target, key) => {
    target.__col__ = {};
    Object.defineProperty(target.__col__, key, {
        value: true,
        enumerable: true,
        writable: true
    });
};
exports.ID = (target, key) => {
    target.__id__ = key;
};
//# sourceMappingURL=decorators.js.map