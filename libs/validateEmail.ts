export const validateEmail = (value: string) => {
  if (!value) {
    return 'Email is required'
  }
  if (!isEmail(value)) {
    return 'Email is invalid'
  }
  return true
}

export const isEmail = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
}
