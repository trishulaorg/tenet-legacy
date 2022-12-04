import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PersonaState } from './UserState'
import type { GetPostQuery } from '../server/autogen/definition'

export interface PersonaType {
  id: number
  name: string
  screenName: string
  iconUrl: string
}

export interface BaseContentType {
  id: string
  content: string
  persona: PersonaType
  createdAt: string
  privilege: GetPostQuery['post']['privilege']
}

export interface BoardType extends BaseContentType {
  title: string
  boardId: string
  description: string
  posts: PostType[]
  persona: PersonaType
}

export interface PostType extends BaseContentType {
  board?: Pick<BoardType, 'id' | 'title' | 'description'> | null
  boardId?: string | null
  title: string
  threads: ThreadType[]
  persona: PersonaType
}

export interface ThreadType extends BaseContentType {
  replies: BaseContentType[]
  board: Pick<BoardType, 'id' | 'title'>
  postId: string
  persona: PersonaType
}

export class PostState {
  private readonly children: PostState[] = []
  parent: PostState | undefined
  id: string
  boardId: string | null
  title: string
  content: string
  author: PersonaState
  upvote: number
  downvote: number
  createdAt: string
  public privilege: GetPostQuery['post']['privilege']
  readonly imageUrls: string[]
  constructor(
    data: Pick<
      GetPostQuery['post'],
      'id' | 'boardId' | 'title' | 'content' | 'createdAt' | 'privilege'
    > & {
      author: PersonaState
      upvote?: number
      downvote?: number
      children?: PostState[]
      parent?: PostState
      imageUrls?: string[]
    }
  ) {
    this.id = data.id
    this.boardId = data.boardId ?? null
    this.title = data.title
    this.content = data.content
    this.author = data.author
    this.children = data.children ?? []
    this.parent = data.parent
    this.privilege = data.privilege
    this.upvote = data.upvote ?? 0
    this.downvote = data.downvote ?? 0
    this.createdAt = data.createdAt
    this.imageUrls = data.imageUrls ?? []
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
      boardId: json.board.id,
      title: json.board.title,
      author: new PersonaState(json.persona),
      children: json.replies.map(
        (v) =>
          new PostState({
            ...v,
            boardId: json.board.id,
            title: json.board.title,
            author: new PersonaState(v.persona),
          })
      ),
    })
  }
}

export class BoardState {
  private _id: string | null
  private _title: string | null
  private _description: string | null
  private _posts: PostState[] = []
  constructor(args: { id?: string; title?: string; description?: string; posts?: PostState[] }) {
    this._id = args.id ?? null
    this._title = args.title ?? null
    this._description = args.description ?? null
    this._posts = args.posts ?? []
    makeAutoObservable(this)
  }
  get id(): string | null {
    return this._id
  }
  set id(value: string | null) {
    this._id = value
  }
  get description(): string | null {
    return this._description
  }
  set description(value: string | null) {
    this._description = value
  }
  get title(): string | null {
    return this._title
  }
  set title(value: string | null) {
    this._title = value
  }
  get posts(): PostState[] {
    return this._posts
  }
  set posts(value: PostState[]) {
    this._posts = value
  }
}

export const BoardStateContext = createContext(new BoardState({}))
