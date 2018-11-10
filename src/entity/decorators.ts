export const Column = (target, key) => {
  Object.defineProperty(target, key, {
    value: undefined,
    enumerable: true,
    writable: true
  });
  
  Object.defineProperty(target[key], '__col__', {
    value: true,
    writable: true,
    enumerable: false
  });
};
