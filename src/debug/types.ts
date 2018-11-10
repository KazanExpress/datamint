export type ExceptionType = 'soft' | 'hard';
export type DebugType = '*'
  | 'connection'
  | 'driver'
  | 'driver:[name]'
  | 'db'
  | 'db:[name]'
  | 'db:[name]:entity'
  | 'db:[name]:entity:[name]';

export type IDebugMap = Partial<{
  [key: string]: boolean | ExceptionType;
}>;

export type LogLevel = 'log' | 'debug' | 'warn' | 'error';
