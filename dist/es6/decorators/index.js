export const enumerable = (isEnumerable = true) => function (target, key, desc) {
    let descriptor = Object.getOwnPropertyDescriptor(target, key) || desc || {};
    if (descriptor.enumerable != isEnumerable) {
        descriptor.enumerable = !!isEnumerable;
        if (descriptor.get || descriptor.set) {
            descriptor.configurable = descriptor.configurable === undefined ? true : descriptor.configurable;
        }
        else {
            descriptor.writable = descriptor.writable === undefined ? true : descriptor.writable;
        }
        Reflect.deleteProperty(target, key);
        Object.defineProperty(target, key, descriptor);
    }
};
//# sourceMappingURL=index.js.map