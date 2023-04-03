import type { Object, Any } from 'ts-toolbelt'
import { get } from 'object-path'

/**
 * Obtains the value of the path of the second argument in the object of the first argument.
 */
export function getByPath<
  T extends Record<Any.Key, unknown>,
  P extends Object.Paths<T> = Object.Paths<T>
>(target: T, path: P): Object.Path<T, P> {
  return get(target, path as unknown as string[])
}
