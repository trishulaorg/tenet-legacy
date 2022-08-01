import type { ClientError } from 'graphql-request'
import type { ZodError, ZodIssue } from 'zod'

const isUniqueConstraintError = (error: ClientError): boolean =>
  !!error.response.errors?.some((innerError) =>
    innerError.extensions?.exception?.stacktrace?.some((message: string) =>
      message.includes('Unique constraint failed')
    )
  )

const getValidationErrors = (error: ClientError): ZodIssue[] =>
  error.response.errors
    ?.map((innerError) => innerError.extensions?.exception)
    .filter(
      (zodError): zodError is ZodError =>
        typeof zodError === 'object' && zodError.name === 'ZodError'
    )
    .map((zodError) => zodError.issues)
    ?.flat() ?? []

export { isUniqueConstraintError, getValidationErrors }
