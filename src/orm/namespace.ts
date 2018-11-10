export type ExceptionType = 'soft' | 'hard';
export type DebugType = '*'
  | 'orm'
  | 'driver'
  | 'driver:[name]'
  | 'db'
  | 'db:[name]'
  | 'db:[name]:entity'
  | 'db:[name]:entity:[name]';

export type IDebugMap = Partial<{
  [key: string]: boolean | ExceptionType;
}>;

export interface IPlugin {
  /** @todo */
  (): void;
}