/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-unused-vars,no-prototype-builtins,@typescript-eslint/no-non-null-assertion */
import type {
  AllowedWritingRole,
  Board,
  DirectMessage,
  FollowingBoard,
  Mutation,
  Persona,
  Post,
  Privilege,
  Query,
  Reply,
  SearchResult,
  ThirdPartyApiKey,
  Thread,
  UploadFile,
  User,
} from './types'

export const anAllowedWritingRole = (
  overrides?: Partial<AllowedWritingRole>,
  _relationshipsToOmit: Set<string> = new Set()
): AllowedWritingRole => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('AllowedWritingRole')
  return {
    create: overrides && overrides.hasOwnProperty('create') ? overrides.create! : false,
    delete: overrides && overrides.hasOwnProperty('delete') ? overrides.delete! : true,
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 1988,
    read: overrides && overrides.hasOwnProperty('read') ? overrides.read! : true,
    update: overrides && overrides.hasOwnProperty('update') ? overrides.update! : false,
  }
}

export const aBoard = (
  overrides?: Partial<Board>,
  _relationshipsToOmit: Set<string> = new Set()
): Board => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Board')
  return {
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '1996-03-30T09:01:49+09:00',
    defaultBoardRole:
      overrides && overrides.hasOwnProperty('defaultBoardRole')
        ? overrides.defaultBoardRole!
        : relationshipsToOmit.has('AllowedWritingRole')
        ? ({} as AllowedWritingRole)
        : anAllowedWritingRole({}, relationshipsToOmit),
    defaultPostRole:
      overrides && overrides.hasOwnProperty('defaultPostRole')
        ? overrides.defaultPostRole!
        : relationshipsToOmit.has('AllowedWritingRole')
        ? ({} as AllowedWritingRole)
        : anAllowedWritingRole({}, relationshipsToOmit),
    defaultReplyRole:
      overrides && overrides.hasOwnProperty('defaultReplyRole')
        ? overrides.defaultReplyRole!
        : relationshipsToOmit.has('AllowedWritingRole')
        ? ({} as AllowedWritingRole)
        : anAllowedWritingRole({}, relationshipsToOmit),
    defaultThreadRole:
      overrides && overrides.hasOwnProperty('defaultThreadRole')
        ? overrides.defaultThreadRole!
        : relationshipsToOmit.has('AllowedWritingRole')
        ? ({} as AllowedWritingRole)
        : anAllowedWritingRole({}, relationshipsToOmit),
    description:
      overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'quae',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '56d2ff93-65e1-44b5-89f7-2e48348da8ed',
    moderators:
      overrides && overrides.hasOwnProperty('moderators')
        ? overrides.moderators!
        : [
            relationshipsToOmit.has('Persona')
              ? ({} as Persona)
              : aPersona({}, relationshipsToOmit),
          ],
    posts:
      overrides && overrides.hasOwnProperty('posts')
        ? overrides.posts!
        : [relationshipsToOmit.has('Post') ? ({} as Post) : aPost({}, relationshipsToOmit)],
    privilege:
      overrides && overrides.hasOwnProperty('privilege')
        ? overrides.privilege!
        : relationshipsToOmit.has('Privilege')
        ? ({} as Privilege)
        : aPrivilege({}, relationshipsToOmit),
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'et',
  }
}

export const aDirectMessage = (
  overrides?: Partial<DirectMessage>,
  _relationshipsToOmit: Set<string> = new Set()
): DirectMessage => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('DirectMessage')
  return {
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '1970-08-30T10:36:07+09:00',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '86bc3d65-5d8a-4448-ab4f-4a39b6d819a7',
    receiver:
      overrides && overrides.hasOwnProperty('receiver')
        ? overrides.receiver!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    sender:
      overrides && overrides.hasOwnProperty('sender')
        ? overrides.sender!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
  }
}

export const aFollowingBoard = (
  overrides?: Partial<FollowingBoard>,
  _relationshipsToOmit: Set<string> = new Set()
): FollowingBoard => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('FollowingBoard')
  return {
    board:
      overrides && overrides.hasOwnProperty('board')
        ? overrides.board!
        : relationshipsToOmit.has('Board')
        ? ({} as Board)
        : aBoard({}, relationshipsToOmit),
    boardId: overrides && overrides.hasOwnProperty('boardId') ? overrides.boardId! : 'consectetur',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '1976-02-18T02:24:50+09:00',
    deletedAt:
      overrides && overrides.hasOwnProperty('deletedAt')
        ? overrides.deletedAt!
        : '1973-05-20T03:53:58+09:00',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'a6e02cdd-96e5-46ff-93e0-c121f504aa96',
    persona:
      overrides && overrides.hasOwnProperty('persona')
        ? overrides.persona!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    personaId: overrides && overrides.hasOwnProperty('personaId') ? overrides.personaId! : 2572,
  }
}

export const aMutation = (
  overrides?: Partial<Mutation>,
  _relationshipsToOmit: Set<string> = new Set()
): Mutation => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Mutation')
  return {
    createBoard:
      overrides && overrides.hasOwnProperty('createBoard')
        ? overrides.createBoard!
        : relationshipsToOmit.has('Board')
        ? ({} as Board)
        : aBoard({}, relationshipsToOmit),
    createDirectMessage:
      overrides && overrides.hasOwnProperty('createDirectMessage')
        ? overrides.createDirectMessage!
        : relationshipsToOmit.has('DirectMessage')
        ? ({} as DirectMessage)
        : aDirectMessage({}, relationshipsToOmit),
    createFollowingBoard:
      overrides && overrides.hasOwnProperty('createFollowingBoard')
        ? overrides.createFollowingBoard!
        : relationshipsToOmit.has('FollowingBoard')
        ? ({} as FollowingBoard)
        : aFollowingBoard({}, relationshipsToOmit),
    createPersona:
      overrides && overrides.hasOwnProperty('createPersona')
        ? overrides.createPersona!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    createPost:
      overrides && overrides.hasOwnProperty('createPost')
        ? overrides.createPost!
        : relationshipsToOmit.has('Post')
        ? ({} as Post)
        : aPost({}, relationshipsToOmit),
    createReply:
      overrides && overrides.hasOwnProperty('createReply')
        ? overrides.createReply!
        : relationshipsToOmit.has('Reply')
        ? ({} as Reply)
        : aReply({}, relationshipsToOmit),
    createThirdPartyAPIKey:
      overrides && overrides.hasOwnProperty('createThirdPartyAPIKey')
        ? overrides.createThirdPartyAPIKey!
        : relationshipsToOmit.has('ThirdPartyApiKey')
        ? ({} as ThirdPartyApiKey)
        : aThirdPartyApiKey({}, relationshipsToOmit),
    createThread:
      overrides && overrides.hasOwnProperty('createThread')
        ? overrides.createThread!
        : relationshipsToOmit.has('Thread')
        ? ({} as Thread)
        : aThread({}, relationshipsToOmit),
    deletePost:
      overrides && overrides.hasOwnProperty('deletePost')
        ? overrides.deletePost!
        : relationshipsToOmit.has('Post')
        ? ({} as Post)
        : aPost({}, relationshipsToOmit),
    putAttachedImage:
      overrides && overrides.hasOwnProperty('putAttachedImage')
        ? overrides.putAttachedImage!
        : [
            relationshipsToOmit.has('UploadFile')
              ? ({} as UploadFile)
              : anUploadFile({}, relationshipsToOmit),
          ],
    setPersonaIcon:
      overrides && overrides.hasOwnProperty('setPersonaIcon')
        ? overrides.setPersonaIcon!
        : relationshipsToOmit.has('UploadFile')
        ? ({} as UploadFile)
        : anUploadFile({}, relationshipsToOmit),
    setTypingStateOnBoard:
      overrides && overrides.hasOwnProperty('setTypingStateOnBoard')
        ? overrides.setTypingStateOnBoard!
        : relationshipsToOmit.has('Post')
        ? ({} as Post)
        : aPost({}, relationshipsToOmit),
    unfollowBoard:
      overrides && overrides.hasOwnProperty('unfollowBoard')
        ? overrides.unfollowBoard!
        : relationshipsToOmit.has('FollowingBoard')
        ? ({} as FollowingBoard)
        : aFollowingBoard({}, relationshipsToOmit),
  }
}

export const aPersona = (
  overrides?: Partial<Persona>,
  _relationshipsToOmit: Set<string> = new Set()
): Persona => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Persona')
  return {
    iconUrl:
      overrides && overrides.hasOwnProperty('iconUrl')
        ? overrides.iconUrl!
        : '/android-chrome-192x192.png',
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 3403,
    name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'tempora',
    screenName:
      overrides && overrides.hasOwnProperty('screenName') ? overrides.screenName! : 'omnis',
  }
}

export const aPost = (
  overrides?: Partial<Post>,
  _relationshipsToOmit: Set<string> = new Set()
): Post => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Post')
  return {
    board:
      overrides && overrides.hasOwnProperty('board')
        ? overrides.board!
        : relationshipsToOmit.has('Board')
        ? ({} as Board)
        : aBoard({}, relationshipsToOmit),
    boardId: overrides && overrides.hasOwnProperty('boardId') ? overrides.boardId! : 'nihil',
    content: overrides && overrides.hasOwnProperty('content') ? overrides.content! : 'qui',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '2005-02-03T06:05:48+09:00',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'f81fef6f-cb78-4de4-a2be-00983c978adf',
    imageUrls:
      overrides && overrides.hasOwnProperty('imageUrls')
        ? overrides.imageUrls!
        : ['/wallpaper.jpg'],
    persona:
      overrides && overrides.hasOwnProperty('persona')
        ? overrides.persona!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    privilege:
      overrides && overrides.hasOwnProperty('privilege')
        ? overrides.privilege!
        : relationshipsToOmit.has('Privilege')
        ? ({} as Privilege)
        : aPrivilege({}, relationshipsToOmit),
    threads:
      overrides && overrides.hasOwnProperty('threads')
        ? overrides.threads!
        : [relationshipsToOmit.has('Thread') ? ({} as Thread) : aThread({}, relationshipsToOmit)],
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'exercitationem',
  }
}

export const aPrivilege = (
  overrides?: Partial<Privilege>,
  _relationshipsToOmit: Set<string> = new Set()
): Privilege => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Privilege')
  return {
    createChild:
      overrides && overrides.hasOwnProperty('createChild') ? overrides.createChild! : true,
    deleteSelf: overrides && overrides.hasOwnProperty('deleteSelf') ? overrides.deleteSelf! : true,
    readChild: overrides && overrides.hasOwnProperty('readChild') ? overrides.readChild! : true,
    updateSelf: overrides && overrides.hasOwnProperty('updateSelf') ? overrides.updateSelf! : true,
  }
}

export const aQuery = (
  overrides?: Partial<Query>,
  _relationshipsToOmit: Set<string> = new Set()
): Query => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Query')
  return {
    activities:
      overrides && overrides.hasOwnProperty('activities')
        ? overrides.activities!
        : [relationshipsToOmit.has('Post') ? ({} as Post) : aPost({}, relationshipsToOmit)],
    board:
      overrides && overrides.hasOwnProperty('board')
        ? overrides.board!
        : relationshipsToOmit.has('Board')
        ? ({} as Board)
        : aBoard({}, relationshipsToOmit),
    getFollowingBoard:
      overrides && overrides.hasOwnProperty('getFollowingBoard')
        ? overrides.getFollowingBoard!
        : [
            relationshipsToOmit.has('FollowingBoard')
              ? ({} as FollowingBoard)
              : aFollowingBoard({}, relationshipsToOmit),
          ],
    me:
      overrides && overrides.hasOwnProperty('me')
        ? overrides.me!
        : relationshipsToOmit.has('User')
        ? ({} as User)
        : aUser({}, relationshipsToOmit),
    persona:
      overrides && overrides.hasOwnProperty('persona')
        ? overrides.persona!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    personas:
      overrides && overrides.hasOwnProperty('personas')
        ? overrides.personas!
        : [
            relationshipsToOmit.has('Persona')
              ? ({} as Persona)
              : aPersona({}, relationshipsToOmit),
          ],
    post:
      overrides && overrides.hasOwnProperty('post')
        ? overrides.post!
        : relationshipsToOmit.has('Post')
        ? ({} as Post)
        : aPost({}, relationshipsToOmit),
    removeUser: overrides && overrides.hasOwnProperty('removeUser') ? overrides.removeUser! : false,
    search:
      overrides && overrides.hasOwnProperty('search')
        ? overrides.search!
        : [
            relationshipsToOmit.has('SearchResult')
              ? ({} as SearchResult)
              : aSearchResult({}, relationshipsToOmit),
          ],
  }
}

export const aReply = (
  overrides?: Partial<Reply>,
  _relationshipsToOmit: Set<string> = new Set()
): Reply => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Reply')
  return {
    content: overrides && overrides.hasOwnProperty('content') ? overrides.content! : 'provident',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '1985-05-15T04:03:01+09:00',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '2b3fe6c0-60ee-4402-b2da-d2a7f586adfb',
    imageUrls:
      overrides && overrides.hasOwnProperty('imageUrls')
        ? overrides.imageUrls!
        : ['/wallpaper.jpg'],
    persona:
      overrides && overrides.hasOwnProperty('persona')
        ? overrides.persona!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    privilege:
      overrides && overrides.hasOwnProperty('privilege')
        ? overrides.privilege!
        : relationshipsToOmit.has('Privilege')
        ? ({} as Privilege)
        : aPrivilege({}, relationshipsToOmit),
    threadId: overrides && overrides.hasOwnProperty('threadId') ? overrides.threadId! : 'nobis',
  }
}

export const aSearchResult = (
  overrides?: Partial<SearchResult>,
  _relationshipsToOmit: Set<string> = new Set()
): SearchResult => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('SearchResult')
  return {
    id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'tempora',
    kind: overrides && overrides.hasOwnProperty('kind') ? overrides.kind! : 'debitis',
    title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
  }
}

export const aThirdPartyApiKey = (
  overrides?: Partial<ThirdPartyApiKey>,
  _relationshipsToOmit: Set<string> = new Set()
): ThirdPartyApiKey => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('ThirdPartyApiKey')
  return {
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '1980-04-23T07:42:05+09:00',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'adc07c63-c94c-4b87-af27-d3440577ea42',
    revokedAt:
      overrides && overrides.hasOwnProperty('revokedAt')
        ? overrides.revokedAt!
        : '2008-02-27T11:15:53+09:00',
    token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'quibusdam',
    user:
      overrides && overrides.hasOwnProperty('user')
        ? overrides.user!
        : relationshipsToOmit.has('User')
        ? ({} as User)
        : aUser({}, relationshipsToOmit),
    userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : 6533,
  }
}

export const aThread = (
  overrides?: Partial<Thread>,
  _relationshipsToOmit: Set<string> = new Set()
): Thread => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('Thread')
  return {
    board:
      overrides && overrides.hasOwnProperty('board')
        ? overrides.board!
        : relationshipsToOmit.has('Board')
        ? ({} as Board)
        : aBoard({}, relationshipsToOmit),
    boardId: overrides && overrides.hasOwnProperty('boardId') ? overrides.boardId! : 'omnis',
    content: overrides && overrides.hasOwnProperty('content') ? overrides.content! : 'voluptatem',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : '2004-09-26T04:39:18+09:00',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '48f781f5-b314-4fec-bab6-bdc5706635e4',
    imageUrls:
      overrides && overrides.hasOwnProperty('imageUrls')
        ? overrides.imageUrls!
        : ['/wallpaper.jpg'],
    persona:
      overrides && overrides.hasOwnProperty('persona')
        ? overrides.persona!
        : relationshipsToOmit.has('Persona')
        ? ({} as Persona)
        : aPersona({}, relationshipsToOmit),
    postId: overrides && overrides.hasOwnProperty('postId') ? overrides.postId! : 'libero',
    privilege:
      overrides && overrides.hasOwnProperty('privilege')
        ? overrides.privilege!
        : relationshipsToOmit.has('Privilege')
        ? ({} as Privilege)
        : aPrivilege({}, relationshipsToOmit),
    replies:
      overrides && overrides.hasOwnProperty('replies')
        ? overrides.replies!
        : [relationshipsToOmit.has('Reply') ? ({} as Reply) : aReply({}, relationshipsToOmit)],
  }
}

export const anUploadFile = (
  overrides?: Partial<UploadFile>,
  _relationshipsToOmit: Set<string> = new Set()
): UploadFile => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('UploadFile')
  return {
    encoding: overrides && overrides.hasOwnProperty('encoding') ? overrides.encoding! : 'ea',
    filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'animi',
    mimetype:
      overrides && overrides.hasOwnProperty('mimetype') ? overrides.mimetype! : 'exercitationem',
  }
}

export const aUser = (
  overrides?: Partial<User>,
  _relationshipsToOmit: Set<string> = new Set()
): User => {
  const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit)
  relationshipsToOmit.add('User')
  return {
    personas:
      overrides && overrides.hasOwnProperty('personas')
        ? overrides.personas!
        : [
            relationshipsToOmit.has('Persona')
              ? ({} as Persona)
              : aPersona({}, relationshipsToOmit),
          ],
  }
}
