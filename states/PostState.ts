import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PersonaState } from './UserState'

export interface PersonaType {
  id: number
  name: string
  screenName: string
  iconUrl: string
}

export interface BaseContentType {
  id: number
  boardId: number
  title: string
  content: string
  persona: PersonaType
  createdAt: string
}

export interface BoardType extends BaseContentType {
  title: string
  description: string
  posts: PostType[]
  persona: PersonaType
}

export interface PostType extends BaseContentType {
  threads: ThreadType[]
  persona: PersonaType
}

export interface ThreadType extends BaseContentType {
  replies: BaseContentType[]
  persona: PersonaType
}

export class PostState {
  private readonly children: PostState[] = []
  protected parent: PostState | undefined
  id: number
  boardId: number
  title: string
  content: string
  author: PersonaState
  upvote: number
  downvote: number
  createdAt: string
  constructor(data: {
    id: number
    boardId: number
    title: string
    content: string
    author: PersonaState
    createdAt: string
    upvote?: number
    downvote?: number
    children?: PostState[]
    parent?: PostState
  }) {
    this.id = data.id
    this.boardId = data.boardId
    this.title = data.title
    this.content = data.content
    this.author = data.author
    this.children = data.children ?? []
    this.parent = data.parent
    this.upvote = data.upvote ?? 0
    this.downvote = data.downvote ?? 0
    this.createdAt = data.createdAt
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
  static fromBoardTypeJSON(json: BoardType): PostState {
    return new PostState({
      ...json,
      author: new PersonaState(json.persona),
      children: json.posts.map((v) => this.fromPostTypeJSON(v)),
    })
  }
  static fromPostTypeJSON(json: PostType): PostState {
    return new PostState({
      ...json,
      author: new PersonaState(json.persona),
      children: json.threads.map((v) => this.fromThreadTypeJSON(v)),
    })
  }
  static fromThreadTypeJSON(json: ThreadType): PostState {
    return new PostState({
      ...json,
      author: new PersonaState(json.persona),
      children: json.replies.map(
        (v) => new PostState({ ...v, author: new PersonaState(v.persona) })
      ),
    })
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
