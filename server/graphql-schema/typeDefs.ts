import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  scalar Date

  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

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
    id: String
    title: String
    posts: [Post]
    createdAt: Date
  }
  type Post {
    id: String
    boardId: String
    board: Board
    title: String
    content: String
    threads: [Thread]
    persona: Persona
    createdAt: Date
    imageUrls: [String]
  }
  type Thread {
    id: String
    boardId: String
    content: String
    replies: [Reply]
    persona: Persona
    createdAt: Date
    imageUrls: [String]
  }
  type Reply {
    id: String
    boardId: String
    content: String
    persona: Persona
    createdAt: Date
    imageUrls: [String]
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
    id: String
    title: String
  }
  type Query {
    me: User
    persona(name: String!): Persona
    personas(names: [String]!): [Persona]
    removeUser(name: String!): Boolean
    board(id: String!): Board
    post(id: String!): Post
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
      boardId: String!
    ): Post
    createThread(
      title: String!
      content: String!
      contentType: ContentType!
      boardId: String!
      postId: String!
      personaId: Int!
    ): Thread
    createReply(
      title: String!
      content: String!
      contentType: ContentType!
      threadId: String!
      personaId: Int!
    ): Reply
    putAttachedImage(postId: String!, files: [Upload]!): [File]!
    setPersonaIcon(personaId: Int!, file: Upload!): File
  }
`

export { typeDefs }
