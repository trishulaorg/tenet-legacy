const swrKey = {
  getActivities: ({ personaId }: { personaId?: string }) => `useGetActivities_${personaId ?? ''}`,
  getBoard: ({ topicId, personaId }: { topicId: string; personaId?: string }) =>
    `useGetFollowingBoard_${topicId}_${personaId ?? ''}`,
  getFollowingBoard: ({ personaId }: { personaId: string }) => `useGetFollowingBoard_${personaId}`,
  getMe: () => `useGetMe`,
  getPost: ({ id, personaId }: { id: string; personaId?: string }) =>
    `useGetPost_${id}_${personaId ?? ''}`,
  search: ({ query }: { query: string }) => `useSearch_${query}`,
} as const

export { swrKey }
