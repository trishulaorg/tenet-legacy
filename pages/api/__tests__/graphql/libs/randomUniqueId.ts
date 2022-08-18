const maxIdCount = 2147483647 // mysql max
const generatedIds: number[] = []

const randomUniqueId = (): number => {
  const generateRandomInt = (): number => Math.floor(Math.random() * maxIdCount)
  while (generatedIds.length < maxIdCount) {
    const newId = generateRandomInt()
    if (!generatedIds.includes(newId)) {
      generatedIds.push(newId)
      return newId
    }
  }
  throw new Error(`You have already produced ${maxIdCount} (max) ids.`)
}

export { randomUniqueId }
