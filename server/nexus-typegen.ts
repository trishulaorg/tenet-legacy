/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./index"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  ContentType: "EMOJI" | "IMAGE" | "LINK" | "TEXT" | "VIDEO"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
  Upload: any
}

export interface NexusGenObjects {
  Board: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // ID!
    title: string; // String!
  }
  File: { // root type
    encoding?: string | null; // String
    filename: string; // String!
    mimetype?: string | null; // String
  }
  Mutation: {};
  Persona: { // root type
    iconUrl: string; // String!
    id: number; // Int!
    name: string; // String!
    screenName: string; // String!
  }
  Post: { // root type
    boardId: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    title: string; // String!
  }
  Query: {};
  Reply: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    threadId: string; // String!
  }
  SearchResult: { // root type
    id: string; // String!
    kind: string; // String!
    title: string; // String!
  }
  Thread: { // root type
    boardId: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    postId: string; // String!
  }
  User: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Board: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // ID!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    title: string; // String!
  }
  File: { // field return type
    encoding: string | null; // String
    filename: string; // String!
    mimetype: string | null; // String
  }
  Mutation: { // field return type
    createBoard: NexusGenRootTypes['Board']; // Board!
    createFollowingBoard: NexusGenRootTypes['Board']; // Board!
    createPersona: NexusGenRootTypes['Persona']; // Persona!
    createPost: NexusGenRootTypes['Post']; // Post!
    createReply: NexusGenRootTypes['Reply']; // Reply!
    createThread: NexusGenRootTypes['Thread']; // Thread!
    putAttachedImage: NexusGenRootTypes['File'][]; // [File!]!
    setPersonaIcon: NexusGenRootTypes['File']; // File!
    setTypingStateOnBoard: NexusGenRootTypes['Post']; // Post!
  }
  Persona: { // field return type
    iconUrl: string; // String!
    id: number; // Int!
    name: string; // String!
    screenName: string; // String!
  }
  Post: { // field return type
    board: NexusGenRootTypes['Board']; // Board!
    boardId: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    imageUrls: string[]; // [String!]!
    persona: NexusGenRootTypes['Persona']; // Persona!
    threads: NexusGenRootTypes['Thread'][]; // [Thread!]!
    title: string; // String!
  }
  Query: { // field return type
    activities: NexusGenRootTypes['Post'][]; // [Post!]!
    board: NexusGenRootTypes['Board']; // Board!
    me: NexusGenRootTypes['User'] | null; // User
    persona: NexusGenRootTypes['Persona']; // Persona!
    personas: Array<NexusGenRootTypes['Persona'] | null>; // [Persona]!
    post: NexusGenRootTypes['Post']; // Post!
    removeUser: boolean; // Boolean!
    search: NexusGenRootTypes['SearchResult'][]; // [SearchResult!]!
  }
  Reply: { // field return type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    imageUrls: string[]; // [String!]!
    persona: NexusGenRootTypes['Persona']; // Persona!
    threadId: string; // String!
  }
  SearchResult: { // field return type
    id: string; // String!
    kind: string; // String!
    title: string; // String!
  }
  Thread: { // field return type
    board: NexusGenRootTypes['Board']; // Board!
    boardId: string; // String!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    imageUrls: string[]; // [String!]!
    persona: NexusGenRootTypes['Persona']; // Persona!
    postId: string; // String!
    replies: NexusGenRootTypes['Reply'][]; // [Reply!]!
  }
  User: { // field return type
    personas: NexusGenRootTypes['Persona'][]; // [Persona!]!
  }
}

export interface NexusGenFieldTypeNames {
  Board: { // field return type name
    createdAt: 'DateTime'
    description: 'String'
    id: 'ID'
    posts: 'Post'
    title: 'String'
  }
  File: { // field return type name
    encoding: 'String'
    filename: 'String'
    mimetype: 'String'
  }
  Mutation: { // field return type name
    createBoard: 'Board'
    createFollowingBoard: 'Board'
    createPersona: 'Persona'
    createPost: 'Post'
    createReply: 'Reply'
    createThread: 'Thread'
    putAttachedImage: 'File'
    setPersonaIcon: 'File'
    setTypingStateOnBoard: 'Post'
  }
  Persona: { // field return type name
    iconUrl: 'String'
    id: 'Int'
    name: 'String'
    screenName: 'String'
  }
  Post: { // field return type name
    board: 'Board'
    boardId: 'String'
    content: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    imageUrls: 'String'
    persona: 'Persona'
    threads: 'Thread'
    title: 'String'
  }
  Query: { // field return type name
    activities: 'Post'
    board: 'Board'
    me: 'User'
    persona: 'Persona'
    personas: 'Persona'
    post: 'Post'
    removeUser: 'Boolean'
    search: 'SearchResult'
  }
  Reply: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    imageUrls: 'String'
    persona: 'Persona'
    threadId: 'String'
  }
  SearchResult: { // field return type name
    id: 'String'
    kind: 'String'
    title: 'String'
  }
  Thread: { // field return type name
    board: 'Board'
    boardId: 'String'
    content: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    imageUrls: 'String'
    persona: 'Persona'
    postId: 'String'
    replies: 'Reply'
  }
  User: { // field return type name
    personas: 'Persona'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createBoard: { // args
      description: string; // String!
      personaId: number; // Int!
      title: string; // String!
    }
    createFollowingBoard: { // args
      boardId: string; // String!
      personaId: number; // Int!
    }
    createPersona: { // args
      iconPath?: string | null; // String
      name: string; // String!
      screenName: string; // String!
    }
    createPost: { // args
      boardId: string; // String!
      content: string; // String!
      contentType: NexusGenEnums['ContentType']; // ContentType!
      personaId: number; // Int!
      title: string; // String!
    }
    createReply: { // args
      content: string; // String!
      contentType: NexusGenEnums['ContentType']; // ContentType!
      personaId: number; // Int!
      threadId: string; // String!
    }
    createThread: { // args
      boardId: string; // String!
      content: string; // String!
      contentType: NexusGenEnums['ContentType']; // ContentType!
      personaId: number; // Int!
      postId: string; // String!
    }
    putAttachedImage: { // args
      files: NexusGenScalars['Upload'][]; // [Upload!]!
      postId: string; // String!
    }
    setPersonaIcon: { // args
      file?: NexusGenScalars['Upload'] | null; // Upload
      personaId: number; // Int!
    }
    setTypingStateOnBoard: { // args
      personaId: number; // Int!
      postId: string; // String!
    }
  }
  Query: {
    board: { // args
      id: string; // String!
    }
    persona: { // args
      name: string; // String!
    }
    personas: { // args
      names: string[]; // [String!]!
    }
    post: { // args
      id: string; // String!
    }
    removeUser: { // args
      name: string; // String!
    }
    search: { // args
      query: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}