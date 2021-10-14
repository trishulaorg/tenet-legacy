export interface APIResult<T> {
  data: T
}

export function fetchAPI<T>(query: string, token?: string): Promise<APIResult<T>> {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? 'INVALID_TOKEN'}`,
    },
    body: JSON.stringify({
      query,
    }),
  }).then((r) => r.json())
}
