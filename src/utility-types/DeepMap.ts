import type { Any } from 'ts-toolbelt'

export type DeepMap<T, V> = {
  [K in keyof T]: T[K] extends Record<Any.Key, unknown> ? DeepMap<T[K], V> : V
}
