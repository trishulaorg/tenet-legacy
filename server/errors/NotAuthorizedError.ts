import { ForbiddenError } from 'apollo-server'

/**
 * For 403 Forbidden, when user does not have permission to do something.
 */
class NotAuthorizedError extends ForbiddenError {}

const defaultNotAuthorizedErrorMessage = 'Bot is not authorized to do this operation'

export { NotAuthorizedError, defaultNotAuthorizedErrorMessage }
