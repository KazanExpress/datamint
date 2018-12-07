export const enumerable = (isEnumerable: boolean = true) => function (target: object, key: string, desc?: any) {
  let descriptor = Object.getOwnPropertyDescriptor(target, key) || desc || {};
  if (descriptor.enumerable != isEnumerable) {
    descriptor.enumerable = !!isEnumerable;
    if (descriptor.get || descriptor.set) {
      descriptor.configurable = descriptor.configurable === undefined ? true : descriptor.configurable;
    } else {
      descriptor.writable = descriptor.writable === undefined ? true : descriptor.writable;
    }
    Reflect.deleteProperty(target, key);
    Object.defineProperty(target, key, descriptor);
  }
};
