import type { Any } from 'ts-toolbelt'

export type PartialDeepMap<T, V> = {
  [K in keyof T]?: T[K] extends Record<Any.Key, unknown> ? PartialDeepMap<T[K], V> : V
}
