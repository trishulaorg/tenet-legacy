const generateRandomAlphabet = (): string => {
  const index = Math.floor(Math.random() * 62)

  return index < 10
    ? String(index)
    : index < 36
    ? String.fromCharCode(index + 55)
    : String.fromCharCode(index + 61)
}

const randomAlphabetString = (length: number): string =>
  Array.from({ length }, generateRandomAlphabet).join('')

const generateRandomCharacter = (): string => String.fromCharCode(Math.floor(Math.random() * 65536))

const randomUnicodeString = (length: number): string =>
  Array.from({ length }, generateRandomCharacter).join('')

export { randomAlphabetString, randomUnicodeString }
