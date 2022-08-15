import { Upload } from '../server/graphql-schema/scalars/scalarDefinitions';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  posts: Array<Post>;
  title: Scalars['String'];
};

export enum ContentType {
  Emoji = 'EMOJI',
  Image = 'IMAGE',
  Link = 'LINK',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type File = {
  __typename?: 'File';
  encoding?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  mimetype?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createPersona: Persona;
  createPost: Post;
  createReply: Reply;
  createThread: Thread;
  putAttachedImage: Array<File>;
  setPersonaIcon: File;
  setTypingStateOnBoard: Post;
};


export type MutationCreateBoardArgs = {
  description: Scalars['String'];
  personaId: Scalars['Int'];
  title: Scalars['String'];
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


export type MutationCreateThreadArgs = {
  boardId: Scalars['String'];
  content: Scalars['String'];
  contentType: ContentType;
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
  threads: Array<Thread>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Post>;
  board: Board;
  me?: Maybe<User>;
  persona: Persona;
  personas: Array<Maybe<Persona>>;
  post: Post;
  removeUser: Scalars['Boolean'];
  search: Array<Maybe<SearchResult>>;
};


export type QueryBoardArgs = {
  id: Scalars['String'];
};


export type QueryPersonaArgs = {
  name: Scalars['String'];
};


export type QueryPersonasArgs = {
  names: Array<Scalars['String']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
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
  threadId: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  id: Scalars['String'];
  kind: Scalars['String'];
  title: Scalars['String'];
};

export type Thread = {
  __typename?: 'Thread';
  board: Board;
  boardId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrls: Array<Scalars['String']>;
  persona: Persona;
  replies: Array<Reply>;
};

export type User = {
  __typename?: 'User';
  personas: Array<Persona>;
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', activities: Array<{ __typename?: 'Post', id: string, boardId: string, title: string, content: string, createdAt: any, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string }, threads: Array<{ __typename?: 'Thread', id: string, content: string, createdAt: any, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string }, replies: Array<{ __typename?: 'Reply', id: string, content: string, createdAt: any, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string } }> }> }> };

export type BoardQueryVariables = Exact<{
  topicId: Scalars['String'];
}>;


export type BoardQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, title: string, posts: Array<{ __typename?: 'Post', id: string, boardId: string, title: string, content: string, imageUrls: Array<string>, createdAt: any, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string }, threads: Array<{ __typename?: 'Thread', id: string, content: string, imageUrls: Array<string>, createdAt: any, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string }, replies: Array<{ __typename?: 'Reply', createdAt: any, id: string, content: string, imageUrls: Array<string>, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string } }> }> }> } };

export type Unnamed_2_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_2_Query = { __typename?: 'Query', me?: { __typename?: 'User', personas: Array<{ __typename?: 'Persona', id: number, name: string, screenName: string, iconUrl: string }> } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, boardId: string, title: string, content: string, imageUrls: Array<string>, createdAt: any, board: { __typename?: 'Board', id: string, title: string }, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string }, threads: Array<{ __typename?: 'Thread', id: string, content: string, imageUrls: Array<string>, createdAt: any, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string }, replies: Array<{ __typename?: 'Reply', createdAt: any, id: string, content: string, imageUrls: Array<string>, persona: { __typename?: 'Persona', screenName: string, name: string, iconUrl: string } }> }> } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResult', kind: string, id: string, title: string } | null> };

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
  persona_id: Scalars['Int'];
  board_id: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type CreateReplyMutationVariables = Exact<{
  content: Scalars['String'];
  persona_id: Scalars['Int'];
  thread_id: Scalars['String'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'Reply', id: string } };

export type CreateThreadMutationVariables = Exact<{
  content: Scalars['String'];
  post_id: Scalars['String'];
  persona_id: Scalars['Int'];
  board_id: Scalars['String'];
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


export const BoardDocument = gql`
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
    `;
export const PostDocument = gql`
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
export const CreateBoardDocument = gql`
    mutation CreateBoard($title: String!, $description: String!, $personaId: Int!) {
  createBoard(title: $title, description: $description, personaId: $personaId) {
    id
  }
}
    `;
export const CreatePersonaDocument = gql`
    mutation CreatePersona($screenName: String!, $name: String!, $iconPath: String!) {
  createPersona(screenName: $screenName, name: $name, iconPath: $iconPath) {
    name
    screenName
  }
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $persona_id: Int!, $board_id: String!) {
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
    `;
export const CreateReplyDocument = gql`
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
    `;
export const CreateThreadDocument = gql`
    mutation CreateThread($content: String!, $post_id: String!, $persona_id: Int!, $board_id: String!) {
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Board(variables: BoardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BoardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BoardQuery>(BoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Board', 'query');
    },
    Post(variables: PostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostQuery>(PostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Post', 'query');
    },
    Search(variables: SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchQuery>(SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Search', 'query');
    },
    CreateBoard(variables: CreateBoardMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateBoardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBoardMutation>(CreateBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateBoard', 'mutation');
    },
    CreatePersona(variables: CreatePersonaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePersonaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePersonaMutation>(CreatePersonaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePersona', 'mutation');
    },
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation');
    },
    CreateReply(variables: CreateReplyMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateReplyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateReplyMutation>(CreateReplyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateReply', 'mutation');
    },
    CreateThread(variables: CreateThreadMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateThreadMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateThreadMutation>(CreateThreadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateThread', 'mutation');
    },
    putAttachedImage(variables: PutAttachedImageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PutAttachedImageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PutAttachedImageMutation>(PutAttachedImageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'putAttachedImage', 'mutation');
    },
    setPersonaIcon(variables: SetPersonaIconMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetPersonaIconMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetPersonaIconMutation>(SetPersonaIconDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setPersonaIcon', 'mutation');
    },
    setTypingStateOnBoard(variables: SetTypingStateOnBoardMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetTypingStateOnBoardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetTypingStateOnBoardMutation>(SetTypingStateOnBoardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setTypingStateOnBoard', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;