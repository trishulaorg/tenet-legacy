import { gql } from 'graphql-request'
import type { NexusGenFieldTypes } from '../generated-files/nexus-typegen'

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
      query getActivities($personaId: String) {
        activities(personaId: $personaId) {
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
          privilege {
            deleteSelf
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
            privilege {
              deleteSelf
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
              privilege {
                deleteSelf
              }
            }
          }
        }
      }
    `,
    board: gql`
      query getBoard($topicId: String!, $personaId: String!) {
        board(id: $topicId, personaId: $personaId) {
          id
          title
          description
          privilege {
            deleteSelf
          }
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
            privilege {
              deleteSelf
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
              privilege {
                deleteSelf
              }
              replies {
                createdAt
                threadId
                id
                content
                imageUrls
                privilege {
                  deleteSelf
                }
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
      query getPost($id: String!, $personaId: String!) {
        post(id: $id, personaId: $personaId) {
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
          privilege {
            deleteSelf
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
            privilege {
              deleteSelf
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
              privilege {
                deleteSelf
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
    getFollowingBoard: gql`
      query getFollowingBoard($personaId: String!) {
        getFollowingBoard(personaId: $personaId) {
          board {
            title
            id
          }
        }
      }
    `,
  },
  Mutation: {
    createBoard: gql`
      mutation createBoard($title: String!, $description: String!, $personaId: String!) {
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
      mutation createPost(
        $title: String!
        $content: String!
        $personaId: String!
        $boardId: String!
      ) {
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
      mutation createReply($content: String!, $personaId: String!, $threadId: String!) {
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
        $personaId: String!
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
      mutation setPersonaIcon($personaId: String!, $file: Upload!) {
        setPersonaIcon(personaId: $personaId, file: $file) {
          filename
        }
      }
    `,
    setTypingStateOnBoard: gql`
      mutation setTypingStateOnBoard($personaId: String!, $postId: String!) {
        setTypingStateOnBoard(personaId: $personaId, postId: $postId) {
          id
        }
      }
    `,
    deletePost: gql`
      mutation deletePost($personaId: String!, $postId: String!) {
        deletePost(personaId: $personaId, postId: $postId) {
          id
        }
      }
    `,
    createFollowingBoard: gql`
      mutation createFollowingBoard($personaId: String!, $boardId: String!) {
        createFollowingBoard(personaId: $personaId, boardId: $boardId) {
          id
        }
      }
    `,
    unfollowBoard: gql`
      mutation unfollowBoard($personaId: String!, $boardId: String!) {
        unfollowBoard(personaId: $personaId, boardId: $boardId) {
          id
        }
      }
    `,
    createThirdPartyAPIKey: gql`
      mutation createThirdPartyAPIKey($type: ThirdPartyAPIKeyType!) {
        createThirdPartyAPIKey(type: $type) {
          token
        }
      }
    `,
  },
} as const

export { queryDocuments }
