import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PersonaState } from './UserState'

export class PostState {
  private children: PostState[] = []
  private parent?: PostState
  title: string
  content: string
  author: PersonaState
  constructor(
    title: string,
    content: string,
    author: PersonaState,
    children?: PostState[],
    parent?: PostState
  ) {
    this.title = title
    this.content = content
    this.author = author
    this.children = children ?? []
    this.parent = parent
    makeAutoObservable(this)
  }
  addResponse(state: PostState): PostState {
    this.children.push(state)
    return this
  }
  get responses(): PostState[] {
    return this.children
  }
  get hasRepsponse(): boolean {
    return this.children.length !== 0
  }
}

export class BoardState {
  id?: number
  title = ''
  description = ''
  posts: PostState[] = []
  constructor(id?: number, opts?: { title: string; description: string; posts: PostState[] }) {
    this.id = id
    if (opts) {
      this.title = opts.title
      this.description = opts.description
      this.posts = opts.posts
    }
    makeAutoObservable(this)
  }
}

export const BoardStateContext = createContext(new BoardState())
