import { gql } from 'graphql-request'
import type { NexusGenFieldTypes } from '../nexus-typegen'

/**
 * FIXME: Implement missing documents
 */
// @ts-expect-error Needs to be implemented.
const queryDocuments: {
  [MethodName in keyof Pick<NexusGenFieldTypes, 'Query' | 'Mutation'>]: {
    [EndpointName in keyof NexusGenFieldTypes[MethodName]]: string
  }
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
      query Board($topicId: String!) {
        board(id: $topicId) {
          id
          title
          posts {
            id
            boardId
            title
            content
            imageUrls
            createdAt
            persona {
              screenName
              name
              iconUrl
            }
            threads {
              id
              content
              imageUrls
              createdAt
              persona {
                screenName
                name
                iconUrl
              }
              replies {
                createdAt
                id
                content
                imageUrls
                persona {
                  screenName
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
    post: gql`
      query Post($id: String!) {
        post(id: $id) {
          id
          boardId
          board {
            id
            title
          }
          title
          content
          imageUrls
          createdAt
          persona {
            screenName
            name
            iconUrl
          }
          threads {
            id
            content
            imageUrls
            createdAt
            persona {
              screenName
              name
              iconUrl
            }
            replies {
              createdAt
              id
              content
              imageUrls
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
      mutation CreatePost(
        $title: String!
        $content: String!
        $persona_id: Int!
        $board_id: String!
      ) {
        createPost(
          title: $title
          content: $content
          contentType: TEXT
          personaId: $persona_id
          boardId: $board_id
        ) {
          id
        }
      }
    `,
    createReply: gql`
      mutation CreateReply($content: String!, $persona_id: Int!, $thread_id: String!) {
        createReply(
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
        $content: String!
        $post_id: String!
        $persona_id: Int!
        $board_id: String!
      ) {
        createThread(
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
    putAttachedImage: gql`
      mutation putAttachedImage($postId: String!, $files: [Upload!]!) {
        putAttachedImage(postId: $postId, files: $files) {
          filename
        }
      }
    `,
    setPersonaIcon: gql`
      mutation setPersonaIcon($personaId: Int!, $file: Upload!) {
        setPersonaIcon(personaId: $personaId, file: $file) {
          filename
        }
      }
    `,
    setTypingStateOnBoard: gql`
      mutation setTypingStateOnBoard($personaId: Int!, $postId: String!) {
        setTypingStateOnBoard(personaId: $personaId, postId: $postId) {
          id
        }
      }
    `,
  },
} as const

export { queryDocuments }
