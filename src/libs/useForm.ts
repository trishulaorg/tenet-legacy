import { useState } from 'react'
import { setByPath } from '@/src/libs/setByPath'
import type { ObjectKeyPaths } from '@/src/utility-types/ObjectKeyPaths'
import type { ObjectValueType } from '@/src/utility-types/ObjectValueType'
import type { PartialDeepMap } from '@/src/utility-types/PartialDeepMap'

export type ValidationErrors<T> = PartialDeepMap<T, string>
export type DirtyFields<T> = PartialDeepMap<T, boolean>

export type HandleChangeFactoryType<T extends object> = <P extends ObjectKeyPaths<T>>(
  path: P
) => (value: ObjectValueType<T, P>) => void

export function useForm<T extends object>(params: {
  defaultValues: T
  validator: {
    validate: (form: T, dirtyFields: DirtyFields<T>) => ValidationErrors<T>
  }
}): {
  form: T
  isValid: boolean
  validationErrors: ValidationErrors<T>
  handleChangeFactory: HandleChangeFactoryType<T>
} {
  const { defaultValues, validator } = params
  const [form, setForm] = useState<T>(defaultValues)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<T>>({})
  const [dirtyFields, setDirtyFields] = useState<DirtyFields<T>>({})

  function handleChangeFactory<P extends ObjectKeyPaths<T>>(
    path: P
  ): (value: ObjectValueType<T, P>) => void {
    return (value: ObjectValueType<T, P>) => {
      // type puzzle is not perfect
      const newDirtyFields = setByPath(
        dirtyFields,
        path,
        true as ObjectValueType<PartialDeepMap<T, boolean>, P>
      )
      setDirtyFields(newDirtyFields)
      const newForm = setByPath(form, path, value)
      setValidationErrors(validator.validate(newForm, newDirtyFields))
      setForm(newForm)
    }
  }

  return {
    form,
    isValid: Object.keys(validationErrors).length === 0,
    validationErrors,
    handleChangeFactory,
  }
}
