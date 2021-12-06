import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PersonaState } from './UserState'

export class PostState {
  private children: PostState[] = []
  private parent?: PostState
  title: string
  content: string
  author: PersonaState
  upvote: number
  downvote: number
  createdAt: Date | number
  constructor(
    title: string,
    content: string,
    author: PersonaState,
    createdAt: Date | number,
    upvote?: number,
    downvote?: number,
    children?: PostState[],
    parent?: PostState
  ) {
    this.title = title
    this.content = content
    this.author = author
    this.children = children ?? []
    this.parent = parent
    this.upvote = upvote ?? 0
    this.downvote = downvote ?? 0
    this.createdAt = createdAt
    makeAutoObservable(this)
  }
  addResponse(state: PostState): PostState {
    this.children.push(state)
    return this
  }
  get responses(): PostState[] {
    return this.children
  }
  get responseNumber(): number {
    return this.children.length
  }
  get hasRepsponse(): boolean {
    return this.children.length !== 0
  }
}

export class BoardState {
  _id: number
  _title = ''
  _description = ''
  _posts: PostState[] = []
  constructor(id?: number, opts?: { title: string; description: string; posts: PostState[] }) {
    this._id = id ?? 0
    if (opts) {
      this._title = opts.title
      this._description = opts.description
      this._posts = opts.posts
    }
    makeAutoObservable(this)
  }
  get id(): number {
    return this._id
  }
  set id(id: number) {
    this._id = id
  }
  get description(): string {
    return this._description
  }
  set description(desc: string) {
    this._description = desc
  }
  get title(): string {
    return this._title
  }
  set title(title: string) {
    this._title = title
  }
  get posts(): PostState[] {
    return this._posts
  }
  set posts(posts: PostState[]) {
    this._posts = posts
  }
}

export const BoardStateContext = createContext(new BoardState())
