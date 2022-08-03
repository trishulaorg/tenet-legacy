import type { ResolverType } from './resolvers'
import { gql } from 'graphql-request'

/**
 * FIXME: Implement missing documents
 */
// @ts-expect-error Needs to be implemented.
const queryDocuments: {
  [MethodName in keyof ResolverType]: { [EndpointName in keyof ResolverType[MethodName]]: string }
} = {
  Query: {
    activities: gql`
      query {
        activities {
          id
          boardId
          title
          content
          createdAt
          persona {
            screenName
            name
            iconUrl
          }
          threads {
            id
            content
            createdAt
            persona {
              screenName
              name
              iconUrl
            }
            replies {
              id
              content
              createdAt
              persona {
                screenName
                name
                iconUrl
              }
            }
          }
        }
      }
    `,
    board: gql`
      query Board($topicId: Int!) {
        board(id: $topicId) {
          id
          title
          posts {
            id
            boardId
            title
            content
            createdAt
            persona {
              name
              iconUrl
            }
            threads {
              id
              content
              createdAt
              persona {
                name
                iconUrl
              }
              replies {
                createdAt
                id
                content
                persona {
                  name
                  iconUrl
                }
              }
            }
          }
        }
      }
    `,
    me: gql`
      query {
        me {
          personas {
            id
            name
            screenName
            iconUrl
          }
        }
      }
    `,
    search: gql`
      query Search($query: String!) {
        search(query: $query) {
          kind
          id
          title
        }
      }
    `,
  },
  Mutation: {
    createBoard: gql`
      mutation CreateBoard($title: String!, $description: String!, $personaId: Int!) {
        createBoard(title: $title, description: $description, personaId: $personaId) {
          id
        }
      }
    `,
    createPersona: gql`
      mutation CreatePersona($screenName: String!, $name: String!, $iconPath: String!) {
        createPersona(screenName: $screenName, name: $name, iconPath: $iconPath) {
          name
          screenName
        }
      }
    `,
    createPost: gql`
      mutation CreatePost($title: String!, $content: String!, $persona_id: Int!, $board_id: Int!) {
        createPost(
          title: $title
          content: $content
          contentType: "TEXT"
          personaId: $persona_id
          boardId: $board_id
        ) {
          id
        }
      }
    `,
    createReply: gql`
      mutation CreateReply(
        $title: String!
        $content: String!
        $persona_id: Int!
        $thread_id: Int!
      ) {
        createReply(
          title: $title
          content: $content
          contentType: TEXT
          personaId: $persona_id
          threadId: $thread_id
        ) {
          id
        }
      }
    `,
    createThread: gql`
      mutation CreateThread(
        $title: String!
        $content: String!
        $post_id: Int!
        $persona_id: Int!
        $board_id: Int!
      ) {
        createThread(
          title: $title
          content: $content
          contentType: TEXT
          personaId: $persona_id
          boardId: $board_id
          postId: $post_id
        ) {
          id
        }
      }
    `,
  },
} as const

export { queryDocuments }
