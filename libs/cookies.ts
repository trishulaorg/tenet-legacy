export function useCookie(): Map<string, string> {
  if (process.browser) {
    return new Map(
      document.cookie
        .split(';')
        .filter((v) => v.trim())
        .map((v) => v.split('=') as [string, string])
    )
  }
  return new Map()
}

export function useGqlToken(): string | undefined {
  const cookies = useCookie()
  return cookies.get('gqltoken')
}
