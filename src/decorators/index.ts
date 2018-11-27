export const enumerable = (isEnumerable: boolean = true) => function (target: object, key: string, desc?: any) {
  let descriptor = Object.getOwnPropertyDescriptor(target, key) || {};
  if (descriptor.enumerable != isEnumerable) {
    descriptor.enumerable = isEnumerable;
    Object.defineProperty(target, key, descriptor);
  }
};
