/**
 * For 404 NotFound.
 */
class NotFoundError extends Error {}

const defaultNotFoundErrorMessage = (
  objectName: string,
  searchKeyName: string,
  searchKeyValue: string | number
): string => `${objectName} with ${searchKeyName} ${searchKeyValue} not found.`

export { NotFoundError, defaultNotFoundErrorMessage }
