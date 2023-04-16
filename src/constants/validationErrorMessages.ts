export const validationErrorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  passwordMin: 'Password must be at least 8 characters',
  passwordMax: 'Please enter a password of no more than 100 characters',
  passwordPolicy:
    'Please include at least one each of the following: single-byte alphabetical lower-case capital letters and numbers',
} as const
