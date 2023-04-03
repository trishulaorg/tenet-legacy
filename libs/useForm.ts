import { useState } from 'react'
import type { Object } from 'ts-toolbelt'
import { setByPath } from '@/libs/setByPath'
import type { ValidationErrors } from '@/types/ValidationErrors'

export type HandleChangeFactoryType<FormType> = <Path extends Object.Paths<FormType>>(
  path: Path
) => (value: Object.Path<FormType, Path>) => void

export function useForm<FormType extends Record<string, unknown>>(params: {
  defaultValues: FormType
  validator: {
    validate: (form: FormType) => ValidationErrors<FormType>
  }
}): {
  form: FormType
  validationErrors: ValidationErrors<FormType>
  handleChangeFactory: HandleChangeFactoryType<FormType>
} {
  const { defaultValues, validator } = params
  const [form, setForm] = useState<FormType>(defaultValues)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<FormType>>({})

  function handleChangeFactory<
    Path extends Object.Paths<FormType>,
    Value extends Object.Path<FormType, Path>
  >(path: Path): (value: Value) => void {
    return (value: Value) => {
      setValidationErrors(validator.validate(form))
      setForm(setByPath<FormType, Path>(form, path, value))
    }
  }

  return {
    form,
    validationErrors,
    handleChangeFactory,
  }
}
