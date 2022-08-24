import type { ClientError } from 'graphql-request'
import type { ZodError, ZodIssue } from 'zod'

const isClientError = (error: unknown): error is ClientError => {
  if (!(error instanceof Error)) {
    return false
  }
  return Object.keys(error).includes('request') && Object.keys(error).includes('response')
}

const isUniqueConstraintError = (error: ClientError): boolean =>
  !!error.response.errors?.some((innerError) =>
    innerError.extensions?.exception?.stacktrace?.some((message: string) =>
      message.includes('Unique constraint failed')
    )
  )

const getValidationErrors = (error: ClientError): ZodIssue[] => {
  const zodErrors =
    error.response.errors
      ?.map((innerError) => innerError.extensions?.exception)
      .filter(
        (innerError): innerError is ZodError =>
          typeof innerError === 'object' && innerError.name === 'ZodError'
      ) ?? []

  return zodErrors.map((zodError) => zodError.issues).flat()
}

export { isClientError, isUniqueConstraintError, getValidationErrors }
