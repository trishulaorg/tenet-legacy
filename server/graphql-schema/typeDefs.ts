import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  scalar Date
  type User {
    personas: [Persona]
  }
  type Persona {
    id: Int
    name: String
    screenName: String
    iconUrl: String
  }
  type Board {
    id: Int
    title: String
    posts: [Post]
    createdAt: Date
  }
  type Post {
    id: Int
    boardId: Int
    title: String
    content: String
    threads: [Thread]
    persona: Persona
    createdAt: Date
  }
  type Thread {
    id: Int
    boardId: Int
    content: String
    replies: [Reply]
    persona: Persona
    createdAt: Date
  }
  type Reply {
    id: Int
    boardId: Int
    content: String
    persona: Persona
    createdAt: Date
  }
  enum ContentType {
    TEXT
    LINK
    IMAGE
    VIDEO
    EMOJI
  }
  type SearchResult {
    kind: String
    id: Int
    title: String
  }
  type Query {
    me: User
    persona(name: String!): Persona
    personas(names: [String]!): [Persona]
    removeUser(name: String!): Boolean
    board(id: Int!): Board
    activities: [Post]
    search(query: String!): [SearchResult]
  }
  type Mutation {
    createPersona(screenName: String!, name: String!, iconPath: String): Persona
    createBoard(title: String!, description: String!, personaId: Int!): Board
    createPost(
      title: String!
      content: String!
      contentType: String!
      personaId: Int!
      boardId: Int!
    ): Post
    createThread(
      title: String!
      content: String!
      contentType: ContentType!
      boardId: Int!
      postId: Int!
      personaId: Int!
    ): Thread
    createReply(
      title: String!
      content: String!
      contentType: ContentType!
      threadId: Int!
      personaId: Int!
    ): Reply
  }
`

export { typeDefs }
