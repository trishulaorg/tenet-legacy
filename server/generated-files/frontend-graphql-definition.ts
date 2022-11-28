import { Upload } from '../../server/graphql-schema/scalars/scalarDefinitions';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Upload: Upload;
};

export type AllowedWritingRole = {
  __typename?: 'AllowedWritingRole';
  create: Scalars['Boolean'];
  delete: Scalars['Boolean'];
  id: Scalars['Int'];
  read: Scalars['Boolean'];
  update: Scalars['Boolean'];
};

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['DateTime'];
  defaultBoardRole: AllowedWritingRole;
  defaultPostRole: AllowedWritingRole;
  defaultReplyRole: AllowedWritingRole;
  defaultThreadRole: AllowedWritingRole;
  description: Scalars['String'];
  id: Scalars['ID'];
  moderators: Array<Persona>;
  posts: Array<Post>;
  privilege: Privilege;
  title: Scalars['String'];
};

export enum ContentType {
  Emoji = 'EMOJI',
  Image = 'IMAGE',
  Link = 'LINK',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type DirectMessage = {
  __typename?: 'DirectMessage';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  receiver: Persona;
  sender: Persona;
};

export type File = {
  __typename?: 'File';
  encoding?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  mimetype?: Maybe<Scalars['String']>;
};

export type FollowingBoard = {
  __typename?: 'FollowingBoard';
  board: Board;
  boardId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  persona: Persona;
  personaId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createDirectMessage: DirectMessage;
  createFollowingBoard: FollowingBoard;
  createPersona: Persona;
  createPost: Post;
  createReply: Reply;
  createThirdPartyAPIKey: ThirdPartyApiKey;
  createThread: Thread;
  deletePost: Post;
  putAttachedImage: Array<File>;
  setPersonaIcon: File;
  setTypingStateOnBoard: Post;
  unfollowBoard: FollowingBoard;
};


export type MutationCreateBoardArgs = {
  description: Scalars['String'];
  personaId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationCreateDirectMessageArgs = {
  rawContent: Scalars['String'];
  receiverId: Scalars['Int'];
  senderId: Scalars['Int'];
};


export type MutationCreateFollowingBoardArgs = {
  boardId: Scalars['String'];
  personaId: Scalars['Int'];
};


export type MutationCreatePersonaArgs = {
  iconPath?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  screenName: Scalars['String'];
};


export type MutationCreatePostArgs = {
  boardId: Scalars['String'];
  content: Scalars['String'];
  contentType: ContentType;
  personaId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationCreateReplyArgs = {
  content: Scalars['String'];
  contentType: ContentType;
  personaId: Scalars['Int'];
  threadId: Scalars['String'];
};


export type MutationCreateThirdPartyApiKeyArgs = {
  type: ThirdPartyApiKeyType;
};


export type MutationCreateThreadArgs = {
  boardId: Scalars['String'];
  content: Scalars['String'];
  contentType: ContentType;
  personaId: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  personaId: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationPutAttachedImageArgs = {
  files: Array<Scalars['Upload']>;
  postId: Scalars['String'];
};


export type MutationSetPersonaIconArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  personaId: Scalars['Int'];
};


export type MutationSetTypingStateOnBoardArgs = {
  personaId: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationUnfollowBoardArgs = {
  boardId: Scalars['String'];
  personaId: Scalars['Int'];
};

export type Persona = {
  __typename?: 'Persona';
  iconUrl: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  screenName: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  board: Board;
  boardId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrls: Array<Scalars['String']>;
  persona: Persona;
  privilege: Privilege;
  threads: Array<Thread>;
  title: Scalars['String'];
};

export type Privilege = {
  __typename?: 'Privilege';
  createChild: Scalars['Boolean'];
  deleteSelf: Scalars['Boolean'];
  readChild: Scalars['Boolean'];
  updateSelf: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Post>;
  board: Board;
  getFollowingBoard: Array<FollowingBoard>;
  me?: Maybe<User>;
  persona: Persona;
  personas: Array<Maybe<Persona>>;
  post: Post;
  removeUser: Scalars['Boolean'];
  search: Array<SearchResult>;
};


export type QueryActivitiesArgs = {
  personaId?: InputMaybe<Scalars['Int']>;
};


export type QueryBoardArgs = {
  id: Scalars['String'];
  personaId?: InputMaybe<Scalars['Int']>;
};


export type QueryGetFollowingBoardArgs = {
  personaId: Scalars['Int'];
};


export type QueryPersonaArgs = {
  name: Scalars['String'];
};


export type QueryPersonasArgs = {
  names: Array<Scalars['String']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
  personaId?: InputMaybe<Scalars['Int']>;
};


export type QueryRemoveUserArgs = {
  name: Scalars['String'];
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrls: Array<Scalars['String']>;
  persona: Persona;
  privilege: Privilege;
  threadId: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  id: Scalars['String'];
  kind: Scalars['String'];
  title: Scalars['String'];
};

export type ThirdPartyApiKey = {
  __typename?: 'ThirdPartyAPIKey';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  revokedAt?: Maybe<Scalars['DateTime']>;
  token: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export enum ThirdPartyApiKeyType {
  Bot = 'BOT',
  User = 'USER'
}

export type Thread = {
  __typename?: 'Thread';
  board: Board;
  boardId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrls: Array<Scalars['String']>;
  persona: Persona;
  postId: Scalars['String'];
  privilege: Privilege;
  replies: Array<Reply>;
};

export type User = {
  __typename?: 'User';
  personas: Array<Persona>;
};

export type GetActivitiesQueryVariables = Exact<{
  personaId?: InputMaybe<Scalars['Int']>;
}>;


export type GetActivitiesQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Post', id: string, boardId: string, title: string, content: string, createdAt: any, board: { __typename?: 'Board', id: string, title: string, description: string }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, threads: Array<{ __typename?: 'Thread', id: string, postId: string, content: string, createdAt: any, board: { __typename?: 'Board', id: string, title: string }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, replies: Array<{ __typename?: 'Reply', id: string, threadId: string, content: string, createdAt: any, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean } }> }> }> };

export type GetBoardQueryVariables = Exact<{
  topicId: Scalars['String'];
  personaId?: InputMaybe<Scalars['Int']>;
}>;


export type GetBoardQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, title: string, description: string, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, posts: Array<{ __typename?: 'Post', id: string, boardId: string, title: string, content: string, imageUrls: Array<string>, createdAt: any, board: { __typename?: 'Board', id: string, description: string, title: string }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, threads: Array<{ __typename?: 'Thread', id: string, boardId: string, postId: string, content: string, imageUrls: Array<string>, createdAt: any, board: { __typename?: 'Board', id: string, title: string }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, replies: Array<{ __typename?: 'Reply', createdAt: any, threadId: string, id: string, content: string, imageUrls: Array<string>, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string } }> }> }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', personas: Array<{ __typename?: 'Persona', id: number, name: string, screenName: string, iconUrl: string }> } | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
  personaId?: InputMaybe<Scalars['Int']>;
}>;


export type GetPostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, boardId: string, title: string, content: string, imageUrls: Array<string>, createdAt: any, board: { __typename?: 'Board', id: string, title: string, description: string }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, threads: Array<{ __typename?: 'Thread', id: string, postId: string, content: string, imageUrls: Array<string>, createdAt: any, board: { __typename?: 'Board', id: string, title: string }, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean }, replies: Array<{ __typename?: 'Reply', createdAt: any, id: string, threadId: string, content: string, imageUrls: Array<string>, persona: { __typename?: 'Persona', id: number, screenName: string, name: string, iconUrl: string }, privilege: { __typename?: 'Privilege', deleteSelf: boolean } }> }> } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResult', kind: string, id: string, title: string }> };

export type GetFollowingBoardQueryVariables = Exact<{
  personaId: Scalars['Int'];
}>;


export type GetFollowingBoardQuery = { __typename?: 'Query', getFollowingBoard: Array<{ __typename?: 'FollowingBoard', board: { __typename?: 'Board', title: string, id: string } }> };

export type CreateBoardMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  personaId: Scalars['Int'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: string } };

export type CreatePersonaMutationVariables = Exact<{
  screenName: Scalars['String'];
  name: Scalars['String'];
  iconPath: Scalars['String'];
}>;


export type CreatePersonaMutation = { __typename?: 'Mutation', createPersona: { __typename?: 'Persona', name: string, screenName: string } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  personaId: Scalars['Int'];
  boardId: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type CreateReplyMutationVariables = Exact<{
  content: Scalars['String'];
  personaId: Scalars['Int'];
  threadId: Scalars['String'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'Reply', id: string } };

export type CreateThreadMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['String'];
  personaId: Scalars['Int'];
  boardId: Scalars['String'];
}>;


export type CreateThreadMutation = { __typename?: 'Mutation', createThread: { __typename?: 'Thread', id: string } };

export type PutAttachedImageMutationVariables = Exact<{
  postId: Scalars['String'];
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type PutAttachedImageMutation = { __typename?: 'Mutation', putAttachedImage: Array<{ __typename?: 'File', filename: string }> };

export type SetPersonaIconMutationVariables = Exact<{
  personaId: Scalars['Int'];
  file: Scalars['Upload'];
}>;


export type SetPersonaIconMutation = { __typename?: 'Mutation', setPersonaIcon: { __typename?: 'File', filename: string } };

export type SetTypingStateOnBoardMutationVariables = Exact<{
  personaId: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type SetTypingStateOnBoardMutation = { __typename?: 'Mutation', setTypingStateOnBoard: { __typename?: 'Post', id: string } };

export type DeletePostMutationVariables = Exact<{
  personaId: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', id: string } };

export type CreateFollowingBoardMutationVariables = Exact<{
  personaId: Scalars['Int'];
  boardId: Scalars['String'];
}>;


export type CreateFollowingBoardMutation = { __typename?: 'Mutation', createFollowingBoard: { __typename?: 'FollowingBoard', id: string } };

export type UnfollowBoardMutationVariables = Exact<{
  personaId: Scalars['Int'];
  boardId: Scalars['String'];
}>;


export type UnfollowBoardMutation = { __typename?: 'Mutation', unfollowBoard: { __typename?: 'FollowingBoard', id: string } };

export type CreateThirdPartyApiKeyMutationVariables = Exact<{
  type: ThirdPartyApiKeyType;
}>;


export type CreateThirdPartyApiKeyMutation = { __typename?: 'Mutation', createThirdPartyAPIKey: { __typename?: 'ThirdPartyAPIKey', token: string } };

export type CreateDirectMessageMutationVariables = Exact<{
  senderId: Scalars['Int'];
  receiverId: Scalars['Int'];
  rawContent: Scalars['String'];
}>;


export type CreateDirectMessageMutation = { __typename?: 'Mutation', createDirectMessage: { __typename?: 'DirectMessage', id: string } };


export const GetActivitiesDocument = gql`
    query getActivities($personaId: Int) {
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
    `;
export const GetBoardDocument = gql`
    query getBoard($topicId: String!, $personaId: Int) {
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
    `;
export const GetMeDocument = gql`
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
    `;
export const GetPostDocument = gql`
    query getPost($id: String!, $personaId: Int) {
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
    `;
export const SearchDocument = gql`
    query Search($query: String!) {
  search(query: $query) {
    kind
    id
    title
  }
}
    `;
export const GetFollowingBoardDocument = gql`
    query getFollowingBoard($personaId: Int!) {
  getFollowingBoard(personaId: $personaId) {
    board {
      title
      id
    }
  }
}
    `;
export const CreateBoardDocument = gql`
    mutation createBoard($title: String!, $description: String!, $personaId: Int!) {
  createBoard(title: $title, description: $description, personaId: $personaId) {
    id
  }
}
    `;
export const CreatePersonaDocument = gql`
    mutation createPersona($screenName: String!, $name: String!, $iconPath: String!) {
  createPersona(screenName: $screenName, name: $name, iconPath: $iconPath) {
    name
    screenName
  }
}
    `;
export const CreatePostDocument = gql`
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
    `;
export const CreateReplyDocument = gql`
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
    `;
export const CreateThreadDocument = gql`
    mutation createThread($content: String!, $postId: String!, $personaId: Int!, $boardId: String!) {
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
    `;
export const PutAttachedImageDocument = gql`
    mutation putAttachedImage($postId: String!, $files: [Upload!]!) {
  putAttachedImage(postId: $postId, files: $files) {
    filename
  }
}
    `;
export const SetPersonaIconDocument = gql`
    mutation setPersonaIcon($personaId: Int!, $file: Upload!) {
  setPersonaIcon(personaId: $personaId, file: $file) {
    filename
  }
}
    `;
export const SetTypingStateOnBoardDocument = gql`
    mutation setTypingStateOnBoard($personaId: Int!, $postId: String!) {
  setTypingStateOnBoard(personaId: $personaId, postId: $postId) {
    id
  }
}
    `;
export const DeletePostDocument = gql`
    mutation deletePost($personaId: Int!, $postId: String!) {
  deletePost(personaId: $personaId, postId: $postId) {
    id
  }
}
    `;
export const CreateFollowingBoardDocument = gql`
    mutation createFollowingBoard($personaId: Int!, $boardId: String!) {
  createFollowingBoard(personaId: $personaId, boardId: $boardId) {
    id
  }
}
    `;
export const UnfollowBoardDocument = gql`
    mutation unfollowBoard($personaId: Int!, $boardId: String!) {
  unfollowBoard(personaId: $personaId, boardId: $boardId) {
    id
  }
}
    `;
export const CreateThirdPartyApiKeyDocument = gql`
    mutation createThirdPartyAPIKey($type: ThirdPartyAPIKeyType!) {
  createThirdPartyAPIKey(type: $type) {
    token
  }
}
    `;
export const CreateDirectMessageDocument = gql`
    mutation createDirectMessage($senderId: Int!, $receiverId: Int!, $rawContent: String!) {
  createDirectMessage(
    senderId: $senderId
    receiverId: $receiverId
    rawContent: $rawContent
  ) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getActivities(variables?: GetActivitiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetActivitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActivitiesQuery>(GetActivitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getActivities', 'query');
    },
    getBoard(variables: GetBoardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBoardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBoardQuery>(GetBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBoard', 'query');
    },
    getMe(variables?: GetMeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeQuery>(GetMeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMe', 'query');
    },
    getPost(variables: GetPostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostQuery>(GetPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPost', 'query');
    },
    Search(variables: SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchQuery>(SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Search', 'query');
    },
    getFollowingBoard(variables: GetFollowingBoardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFollowingBoardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFollowingBoardQuery>(GetFollowingBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFollowingBoard', 'query');
    },
    createBoard(variables: CreateBoardMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateBoardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBoardMutation>(CreateBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createBoard', 'mutation');
    },
    createPersona(variables: CreatePersonaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePersonaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePersonaMutation>(CreatePersonaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPersona', 'mutation');
    },
    createPost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPost', 'mutation');
    },
    createReply(variables: CreateReplyMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateReplyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateReplyMutation>(CreateReplyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createReply', 'mutation');
    },
    createThread(variables: CreateThreadMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateThreadMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateThreadMutation>(CreateThreadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createThread', 'mutation');
    },
    putAttachedImage(variables: PutAttachedImageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PutAttachedImageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PutAttachedImageMutation>(PutAttachedImageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'putAttachedImage', 'mutation');
    },
    setPersonaIcon(variables: SetPersonaIconMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetPersonaIconMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetPersonaIconMutation>(SetPersonaIconDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setPersonaIcon', 'mutation');
    },
    setTypingStateOnBoard(variables: SetTypingStateOnBoardMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetTypingStateOnBoardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetTypingStateOnBoardMutation>(SetTypingStateOnBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setTypingStateOnBoard', 'mutation');
    },
    deletePost(variables: DeletePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>(DeletePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePost', 'mutation');
    },
    createFollowingBoard(variables: CreateFollowingBoardMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateFollowingBoardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateFollowingBoardMutation>(CreateFollowingBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createFollowingBoard', 'mutation');
    },
    unfollowBoard(variables: UnfollowBoardMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnfollowBoardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnfollowBoardMutation>(UnfollowBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unfollowBoard', 'mutation');
    },
    createThirdPartyAPIKey(variables: CreateThirdPartyApiKeyMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateThirdPartyApiKeyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateThirdPartyApiKeyMutation>(CreateThirdPartyApiKeyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createThirdPartyAPIKey', 'mutation');
    },
    createDirectMessage(variables: CreateDirectMessageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDirectMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDirectMessageMutation>(CreateDirectMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createDirectMessage', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useGetActivities(key: SWRKeyInterface, variables?: GetActivitiesQueryVariables, config?: SWRConfigInterface<GetActivitiesQuery, ClientError>) {
      return useSWR<GetActivitiesQuery, ClientError>(key, () => sdk.getActivities(variables), config);
    },
    useGetBoard(key: SWRKeyInterface, variables: GetBoardQueryVariables, config?: SWRConfigInterface<GetBoardQuery, ClientError>) {
      return useSWR<GetBoardQuery, ClientError>(key, () => sdk.getBoard(variables), config);
    },
    useGetMe(key: SWRKeyInterface, variables?: GetMeQueryVariables, config?: SWRConfigInterface<GetMeQuery, ClientError>) {
      return useSWR<GetMeQuery, ClientError>(key, () => sdk.getMe(variables), config);
    },
    useGetPost(key: SWRKeyInterface, variables: GetPostQueryVariables, config?: SWRConfigInterface<GetPostQuery, ClientError>) {
      return useSWR<GetPostQuery, ClientError>(key, () => sdk.getPost(variables), config);
    },
    useSearch(key: SWRKeyInterface, variables: SearchQueryVariables, config?: SWRConfigInterface<SearchQuery, ClientError>) {
      return useSWR<SearchQuery, ClientError>(key, () => sdk.Search(variables), config);
    },
    useGetFollowingBoard(key: SWRKeyInterface, variables: GetFollowingBoardQueryVariables, config?: SWRConfigInterface<GetFollowingBoardQuery, ClientError>) {
      return useSWR<GetFollowingBoardQuery, ClientError>(key, () => sdk.getFollowingBoard(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;