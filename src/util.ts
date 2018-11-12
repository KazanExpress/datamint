/**
 * fromPath
 * Returns a value from an object by a given path (usually string).
 *
 * @see [gist](https://gist.github.com/Raiondesu/759425dede5b7ff38db51ea5a1fb8f11)
 *
 * @param obj an object to get a value from.
 * @param path to get a value by.
 * @param splitter to split the path by. Default is '.' ('obj.path.example')
 * @returns a value from a given path. If a path is invalid - returns undefined.
 */
export function fromPath(obj, path, splitter = '.') {
  if (!path)
    return obj;

  if (typeof path === 'number' || !~path.indexOf(splitter))
    return obj[path];

  return path.split(splitter).reduce((o, i) => (o === Object(o) ? o[i] : o), obj);
}

export function NonEnumerable(target: object, key: string, desc: PropertyDescriptor = {}) {
  Object.defineProperty(target, key, {
    ...desc,

    // TODO: check to be writable
    enumerable: false
  });
}

export type Key = string | number | symbol;
