import type { ValidationErrors } from '@/types/ValidationErrors'
import type { Schema } from 'zod'
import { ZodError } from 'zod'
import mapObject from 'map-obj'

export function zodResolver<FormType>(schema: Schema): {
  validate: (form: FormType) => ValidationErrors<FormType>
} {
  return {
    validate: (form: FormType) => {
      try {
        schema.parse(form)
        return {}
      } catch (error) {
        if (error instanceof ZodError) {
          return mapObject(error.formErrors.fieldErrors, (key, value) => [
            String(key),
            value?.join(),
          ]) as ValidationErrors<FormType>
        }
        return {}
      }
    },
  }
}
