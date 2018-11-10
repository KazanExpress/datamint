export const Column = (target, key) => {
  target.__col__ = {};
  Object.defineProperty(target.__col__, key, {
    value: true,
    enumerable: true,
    writable: true
  });
};

export const ID = (target, key) => {
  target.__id__ = key;
};