import type { ClientError } from 'graphql-request'

const isUniqueConstraintError = (error: ClientError): boolean =>
  !!error.response.errors?.some((innerError) =>
    innerError.extensions?.exception?.stacktrace?.some((message: string) =>
      message.includes('Unique constraint failed')
    )
  )

export { isUniqueConstraintError }
