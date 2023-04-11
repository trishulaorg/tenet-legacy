/**
 * Copy from https://github.com/type-challenges/type-challenges/issues/696
 */
export type ObjectValueType<T, K extends string> = K extends `${infer P0}.${infer P1}`
  ? ObjectValueType<T[P0 & keyof T], P1>
  : T[K & keyof T]
