/**
 * @file Show path of error workaround from https://github.com/colinhacks/zod/issues/1208#issuecomment-1173886098
 */
import { z, ZodErrorMap } from 'zod'

const defaultValidationStrings = {
  default: {
    default: '"{{label}}" does not pass validation requirements.',
    invalid_type: '"{{label}}" is of an invalid type.',
    invalid_literal: '"{{label}}" is an invalid literal.',
    custom: '"{{label}}" does not pass custom validation requirements.',
    invalid_union: '"{{label}}" is not a valid union.',
    invalid_union_discriminator: '"{{label}}" is not a valid discriminated union.',
    invalid_enum_value: '"{{label}}" is not a valid enum value.',
    unrecognized_keys: '"{{label}}" contains unrecognized keys.',
    invalid_arguments: '"{{label}}" has invalid arguments.',
    invalid_return_type: '"{{label}}" has an invalid return type.',
    too_small: '"{{label}}" is too small.',
    too_big: '"{{label}}" is too big.',
    invalid_intersection_types: '"{{label}}" is an invalid intersection.',
    not_multiple_of: '"{{label}}" is not a valid multiple of',
    invalid_date: '"{{label}}" is not a valid date.',
  },
  string: {
    invalid_type: '"{{label}}" must be a string.',
    invalid_email: '"{{label}}" is not a valid email address.',
    invalid_url: '"{{label}}" is not a valid URL.',
    invalid_uuid: '"{{label}}" is not a valid UUID.',
    invalid_regex: '"{{label}}" does not meet the pattern requirements.',
    invalid_cuid: '"{{label}}" is not a valid CUID.',
    invalid_string: '"{{label}}" is not a valid string.',
    too_small: '"{{label}}" is too short.',
    too_big: '"{{label}}" is too long.',
  },
  number: {
    too_small: '"{{label}}" is too small.',
    too_big: '"{{label}}" is too big.',
    not_multiple_of: '"{{label}}" is not a valid multiple of',
  },
  symbol: {
    too_small: '"{{label}}" has too few items.',
    too_big: '"{{label}}" has too many items.',
    not_multiple_of: '"{{label}}" is not a valid multiple of',
  },
}

type KeysOfUnion<T> = T extends T ? keyof T : never

const customErrorMap: ZodErrorMap = (issue) => {
  let typeAccessor: keyof typeof defaultValidationStrings = 'default'
  let errorAccessor: KeysOfUnion<
    typeof defaultValidationStrings[keyof typeof defaultValidationStrings]
  > = issue.code || 'default'

  if (
    'type' in issue &&
    issue.type &&
    defaultValidationStrings[issue.type as keyof typeof defaultValidationStrings]
  ) {
    typeAccessor = issue.type as keyof typeof defaultValidationStrings
  }

  if (
    !defaultValidationStrings[typeAccessor] ||
    // @ts-expect-error just ignore
    !defaultValidationStrings[typeAccessor][errorAccessor]
  ) {
    typeAccessor = 'default'
  }

  // @ts-expect-error just ignore
  if (!defaultValidationStrings['default'][errorAccessor]) {
    errorAccessor = 'default'
  }

  // @ts-expect-error just ignore
  const messageTemplate = defaultValidationStrings[typeAccessor][errorAccessor]

  return {
    ...issue,
    message: messageTemplate.replace('{{label}}', `${issue.path[issue.path.length - 1]}`),
  }
}

z.setErrorMap(customErrorMap)
