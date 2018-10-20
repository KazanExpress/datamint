export * from './LocalStorageDriver';
export * from './NoDriver';

export function fromPath(obj, path: string, sep: string = '.') {
  return path.split(sep).reduce((o, i) => (o === Object(o) ? o[i] : o), obj);
}
