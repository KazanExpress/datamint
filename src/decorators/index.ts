export const enumerable = (isEnumerable: boolean = true) => function (target: object, key: string, desc?: PropertyDescriptor) {
  if (desc) {
    desc.enumerable = isEnumerable;
  } else {
    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      value: undefined,
      enumerable: isEnumerable,
      writable: true
    });
  }
};
