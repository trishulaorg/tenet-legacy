import type { ObjectKeyPaths } from '@/utility-types/ObjectKeyPaths'
import type { ObjectValueType } from '@/utility-types/ObjectValueType'
import { get } from 'lodash'

/**
 * Obtains the value of the path of the second argument in the object of the first argument.
 */
export function getByPath<T extends object, P extends ObjectKeyPaths<T>>(
  target: T,
  path: P
): ObjectValueType<T, P> {
  return get(target, path as unknown as string[])
}
