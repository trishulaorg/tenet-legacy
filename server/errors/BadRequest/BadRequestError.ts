import { UserInputError } from 'apollo-server'

/**
 * For 400 BadRequestError.
 */
class BadRequestError extends UserInputError {}

export { BadRequestError }
