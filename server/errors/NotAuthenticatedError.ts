import { AuthenticationError } from 'apollo-server-errors'

/**
 * For 401 Unauthorized, when user is not logged in.
 */
class NotAuthenticatedError extends AuthenticationError {}

const defaultNotAuthenticatedErrorMessage = 'User is not authenticated'

export { NotAuthenticatedError, defaultNotAuthenticatedErrorMessage }
