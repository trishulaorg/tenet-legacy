import type { Activity } from '@/models/activity/Activity'
import type { BoardDescription } from '@/models/board/BoardDescription'
import type { BoardId } from '@/models/board/BoardId'
import type { BoardTitle } from '@/models/board/BoardTitle'
import type { Post } from '@/models/post/Post'
import type { Thread } from '@/models/thread/Thread'
import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PersonaState } from './UserState'

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
  createdAt: Date
  readonly imageUrls: string[]
  constructor(data: {
    id: string
    boardId?: BoardId | null
    title: string
    content: string
    createdAt: Date
    author: PersonaState
    upvote?: number
    downvote?: number
    children?: PostState[]
    parent?: PostState
    imageUrls?: string[]
  }) {
    this.id = data.id
    this.boardId = data.boardId ?? null
    this.title = data.title
    this.content = data.content
    this.author = data.author
    this.children = data.children ?? []
    this.parent = data.parent
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
  static fromPostTypeJSON(json: Post | Activity): PostState {
    return new PostState({
      id: json.id,
      boardId: json.board.id,
      title: json.title,
      content: json.content,
      createdAt: new Date(json.createdAt),
      imageUrls: 'imageUrls' in json ? json.imageUrls : [],
      author: new PersonaState({
        id: json.persona.id,
        name: json.persona.name,
        screenName: json.persona.screenName,
        iconUrl: json.persona.iconUrl,
      }),
      children: json.threads.map((v) => this.fromThreadTypeJSON(v)),
    })
  }
  static fromThreadTypeJSON(json: Thread): PostState {
    return new PostState({
      id: json.id,
      content: json.content,
      createdAt: new Date(json.createdAt),
      imageUrls: json.imageUrls,
      boardId: json.board.id,
      title: json.board.title,
      author: new PersonaState({
        id: json.persona.id,
        name: json.persona.name,
        screenName: json.persona.screenName,
        iconUrl: json.persona.iconUrl,
      }),
      children: json.replies.map(
        (v) =>
          new PostState({
            id: v.id,
            content: v.content,
            createdAt: new Date(v.createdAt),
            imageUrls: v.imageUrls,
            boardId: json.board.id,
            title: json.board.title,
            author: new PersonaState({
              id: v.persona.id,
              name: v.persona.name,
              screenName: v.persona.screenName,
              iconUrl: v.persona.iconUrl,
            }),
          })
      ),
    })
  }
}

export class BoardState {
  private _id: BoardId | null
  private _title: BoardTitle | null
  private _description: BoardDescription | null
  private _posts: PostState[] = []
  constructor(args: {
    id?: BoardId
    title?: BoardTitle
    description?: BoardDescription
    posts?: PostState[]
  }) {
    this._id = args.id ?? null
    this._title = args.title ?? null
    this._description = args.description ?? null
    this._posts = args.posts ?? []
    makeAutoObservable(this)
  }
  get id(): BoardId | null {
    return this._id
  }
  set id(value: BoardId | null) {
    this._id = value
  }
  get description(): BoardDescription | null {
    return this._description
  }
  set description(value: BoardDescription | null) {
    this._description = value
  }
  get title(): BoardTitle | null {
    return this._title
  }
  set title(value: BoardTitle | null) {
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
