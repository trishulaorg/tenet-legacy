import type { apiHooks, client } from './fetchAPI'

type SwrKey = {
  [key in Exclude<keyof typeof apiHooks, keyof typeof client>]: (
    args: Parameters<typeof apiHooks[key]>[1]
  ) => string
}

const swrKey: SwrKey = {
  useGetActivities: (args) => `useGetActivities_${args?.personaId}`,
  useGetBoard: ({ personaId, topicId }) => `useGetFollowingBoard_${topicId}_${personaId}`,
  useGetFollowingBoard: ({ personaId }) => `useGetFollowingBoard_${personaId}`,
  useGetMe: () => `useGetMe`,
  useGetPost: ({ id, personaId }) => `useGetPost_${id}_${personaId}`,
  useSearch: ({ query }) => `useSearch_${query}`,
} as const

export { swrKey }
