export function getCookies(): Map<string, string> {
  if (typeof window === 'undefined') return new Map()
  return new Map(
    document.cookie
      .split(';')
      .filter((v) => v.trim())
      .map((v) => v.split('=').map((v) => decodeURIComponent(v.trim())) as [string, string])
  )
}

export function convertToString(cookies: Map<string, string>): string {
  cookies.delete('gqltoken')
  const kv: string[] = []
  for (const v of cookies.entries()) {
    kv.push(v.join('='))
  }
  return kv.join(';')
}

export function removeGqlCookie(): boolean {
  if (process.browser) {
    document.cookie = 'gqltoken=; max-age=0'
    return true
  }
  return false
}

export function getGqlToken(): string {
  const cookies = getCookies()
  return cookies.get('gqltoken') ?? 'INVALID_TOKEN'
}
