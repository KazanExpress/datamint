export const enumerable = (isEnumerable: boolean = true) => function (target: object, key: string, desc: PropertyDescriptor = {}) {
  desc.enumerable = isEnumerable;
};

export * from './logs';
