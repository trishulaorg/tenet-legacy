import type { z } from 'zod'
import { ZodError } from 'zod'
import type { DirtyFields, ValidationErrors } from '@/libs/useForm'
import { getByPath } from './getByPath'
import { setByPath } from './setByPath'

export function zodResolver<T>(schema: z.ZodType<T>): {
  validate: (form: T, dirtyFields: DirtyFields<T>) => ValidationErrors<T>
} {
  return {
    validate: (form: T, dirtyFields: DirtyFields<T>) => {
      try {
        schema.parse(form)
        return {}
      } catch (error) {
        if (error instanceof ZodError) {
          const validationErrors: ValidationErrors<T> = {}
          for (const issue of error.issues) {
            const path = issue.path.join('.')
            if (getByPath(dirtyFields, path as never) !== true) {
              continue
            }
            setByPath(validationErrors, path as never, issue.message as never, true)
          }
          return validationErrors
        }
        return {}
      }
    },
  }
}
