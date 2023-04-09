import set from 'lodash.set'
import type { ObjectValueType } from '@/utility-types/ObjectValueType'
import type { ObjectKeyPaths } from '@/utility-types/ObjectKeyPaths'

/**
 * Returns a new object with the value of the third argument assigned to the path specified in the second argument of the first object.
 */
export function setByPath<T extends object, P extends ObjectKeyPaths<T>>(
  target: T,
  path: P,
  value: ObjectValueType<T, P>,
  destructive = false
): T {
  if (destructive) {
    return set(target, path as unknown as string[], value)
  } else {
    return set({ ...target }, path as unknown as string[], value)
  }
}
