/**
 * fromPath
 * Returns a value from an object by a given path (usually string).
 *
 * https://gist.github.com/Raiondesu/759425dede5b7ff38db51ea5a1fb8f11
 *
 * @param obj an object to get a value from.
 * @param path to get a value by.
 * @param splitter to split the path by. Default is '.' ('obj.path.example')
 * @returns a value from a given path. If a path is invalid - returns undefined.
 */
export declare function fromPath(obj: any, path: any, splitter?: string): any;
