import { makeAutoObservable } from 'mobx'

export interface Persona {
  id: string
  name: string
  iconUrl?: string
}

export class PostState {
  private children: PostState[] = []
  private parent?: PostState
  title: string
  content: string
  author: Persona
  constructor(
    title: string,
    content: string,
    author: Persona,
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
