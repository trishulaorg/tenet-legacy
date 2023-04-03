import type { Object, Any } from 'ts-toolbelt'
import { set } from 'object-path'

/**
 * Returns a new object with the value of the third argument assigned to the path specified in the second argument of the first object.
 */
export function setByPath<T extends Record<Any.Key, unknown>, P extends Object.Paths<T>>(
  target: T,
  path: Object.Paths<T>,
  value: Object.Path<T, P>
): T {
  const newValue = set(target, path as unknown as string[], value)
  if (newValue == null) {
    throw new Error('setByPath: newValue is null or undefined')
  }
  return target
}
