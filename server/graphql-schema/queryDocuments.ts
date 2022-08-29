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
      query getActivities {
        activities {
          id
          board {
            id
            title
            description
          }
          boardId
          title
          content
          createdAt
          persona {
            id
            screenName
            name
            iconUrl
          }
          threads {
            id
            board {
              id
              title
            }
            postId
            content
            createdAt
            persona {
              id
              screenName
              name
              iconUrl
            }
            replies {
              id
              threadId
              content
              createdAt
              persona {
                id
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
      query getBoard($topicId: String!) {
        board(id: $topicId) {
          id
          title
          description
          posts {
            id
            boardId
            board {
              id
              description
              title
            }
            title
            content
            imageUrls
            createdAt
            persona {
              id
              screenName
              name
              iconUrl
            }
            threads {
              id
              board {
                id
                title
              }
              boardId
              postId
              content
              imageUrls
              createdAt
              persona {
                id
                screenName
                name
                iconUrl
              }
              replies {
                createdAt
                threadId
                id
                content
                imageUrls
                persona {
                  id
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
      query getMe {
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
      query getPost($id: String!) {
        post(id: $id) {
          id
          boardId
          board {
            id
            title
            description
          }
          title
          content
          imageUrls
          createdAt
          persona {
            id
            screenName
            name
            iconUrl
          }
          threads {
            id
            board {
              id
              title
            }
            postId
            content
            imageUrls
            createdAt
            persona {
              id
              screenName
              name
              iconUrl
            }
            replies {
              createdAt
              id
              threadId
              content
              imageUrls
              persona {
                id
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
      mutation createBoard($title: String!, $description: String!, $personaId: Int!) {
        createBoard(title: $title, description: $description, personaId: $personaId) {
          id
        }
      }
    `,
    createPersona: gql`
      mutation createPersona($screenName: String!, $name: String!, $iconPath: String!) {
        createPersona(screenName: $screenName, name: $name, iconPath: $iconPath) {
          name
          screenName
        }
      }
    `,
    createPost: gql`
      mutation createPost($title: String!, $content: String!, $personaId: Int!, $boardId: String!) {
        createPost(
          title: $title
          content: $content
          contentType: TEXT
          personaId: $personaId
          boardId: $boardId
        ) {
          id
        }
      }
    `,
    createReply: gql`
      mutation createReply($content: String!, $personaId: Int!, $threadId: String!) {
        createReply(
          content: $content
          contentType: TEXT
          personaId: $personaId
          threadId: $threadId
        ) {
          id
        }
      }
    `,
    createThread: gql`
      mutation createThread(
        $content: String!
        $postId: String!
        $personaId: Int!
        $boardId: String!
      ) {
        createThread(
          content: $content
          contentType: TEXT
          personaId: $personaId
          boardId: $boardId
          postId: $postId
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
    createFollowingBoard: gql`
      mutation createFollowingBoard($personaId: Int!, $boardId: String!) {
        createFollowingBoard(personaId: $personaId, boardId: $boardId) {
          id
        }
      }
    `,
  },
} as const

export { queryDocuments }
