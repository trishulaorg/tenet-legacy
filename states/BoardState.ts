import type { BoardWithPosts } from '@/domain/models/board/BoardWithPosts'
import { createContext, useContext } from 'react'

const BoardContext = createContext<BoardWithPosts>({} as BoardWithPosts)

export const BoardProvider = BoardContext.Provider

export function useBoard(): BoardWithPosts {
  return useContext(BoardContext)
}
