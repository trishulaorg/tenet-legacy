import type { Any } from 'ts-toolbelt'

export type ValidationErrors<T> = {
  [K in keyof T]?: K extends Record<Any.Key, unknown> ? ValidationErrors<K> : string
}
