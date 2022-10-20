import { arg, enumType, list, nonNull, objectType } from 'nexus'
import { getPostsWithImageUrls } from './getImageUrls'
import {
  defaultNotAuthenticatedErrorMessage,
  NotAuthenticatedError,
} from '../../errors/NotAuthenticatedError'
import { NotFoundError } from '../../errors/NotFoundError'
import { ulid } from 'ulid'
import { uploadImageFileToS3 } from '../../fileUpload/uploadImageFileToS3'
import { NotAuthorizedError } from '../../errors/NotAuthorizedError'
import { formatISO } from 'date-fns'
import {
  AllowedWritingRole,
  Board,
  ContentType,
  FollowingBoard,
  Persona,
  Post,
  Reply,
  ThirdPartyAPIKey,
  ThirdPartyAPIKeyType,
  Thread,
  User,
} from 'nexus-prisma'
import type {
  Post as PrismaPost,
  Reply as PrismaReply,
  Thread as PrismaThread,
} from '@prisma/client'
import {
  hasPriviledgeToDeletePost,
  postWithPrivilege,
  validatePersona,
} from '../domain/authorization'
import type { Privilege } from '../../generated-files/frontend-graphql-definition'

const FileDef = objectType({
  name: 'File',
  nonNullDefaults: {
    input: true,
    output: false,
  },
  definition(t) {
    t.nonNull.string('filename')
    t.string('mimetype')
    t.string('encoding')
  },
})

const UserDef = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.personas)
  },
})

const PersonaDef = objectType({
  name: Persona.$name,
  definition(t) {
    t.field(Persona.id)
    t.field(Persona.name)
    t.field(Persona.screenName)
    t.field(Persona.iconUrl)
  },
})

const PrivilegeDef = objectType({
  name: 'Privilege',
  definition(t) {
    t.nonNull.boolean('createChild')
    t.nonNull.boolean('readChild')
    t.nonNull.boolean('updateSelf')
    t.nonNull.boolean('deleteSelf')
  },
})

const AllowedWritingRoleDef = objectType({
  name: AllowedWritingRole.$name,
  definition(t) {
    t.field(AllowedWritingRole.id)
    t.field(AllowedWritingRole.create)
    t.field(AllowedWritingRole.read)
    t.field(AllowedWritingRole.update)
    t.field(AllowedWritingRole.delete)
  },
})

const BoardDef = objectType({
  name: Board.$name,
  definition(t) {
    arg({
      type: nonNull('String'),
    })
    t.field(Board.id)
    t.field(Board.title)
    t.field(Board.description)
    t.field(Board.moderators)
    t.nonNull.field('privilege', {
      type: PrivilegeDef.name,
      resolve(source) {
        // @ts-expect-error pass privilege from mutation
        if ('privilege' in source && typeof source['privilege'] === 'object') {
          // @ts-expect-error pass privilege from mutation
          return source['privilege'] as unknown as Privilege
        } else {
          return {
            createChild: false,
            readChild: false,
            updateSelf: false,
            deleteSelf: false,
          }
        }
      },
    })
    t.field({
      ...Board.posts,
      resolve: (source, ...rest) => {
        // @ts-expect-error preserve imageUrls
        if ('posts' in source && Array.isArray(source['posts'])) {
          // @ts-expect-error preserve imageUrls
          return source['posts'] as unknown as PrismaPost[]
        } else {
          return Board.posts.resolve(source, ...rest)
        }
      },
    })
    t.field(Board.createdAt)
    t.field(Board.defaultBoardRole)
    t.field(Board.defaultPostRole)
    t.field(Board.defaultThreadRole)
    t.field(Board.defaultReplyRole)
  },
})

const PostDef = objectType({
  name: Post.$name,
  definition(t) {
    t.field(Post.id)
    t.field(Post.boardId)
    t.field(Post.board)
    t.field(Post.title)
    t.field(Post.content)
    t.field({
      ...Post.threads,
      resolve: (source, ...rest) => {
        // @ts-expect-error preserve imageUrls
        if ('threads' in source && Array.isArray(source['threads'])) {
          // @ts-expect-error preserve imageUrls
          return source['threads'] as unknown as PrismaThread[]
        } else {
          return Post.threads.resolve(source, ...rest)
        }
      },
    })
    t.nonNull.field('privilege', {
      type: PrivilegeDef.name,
      resolve(source) {
        // @ts-expect-error pass privilege from mutation
        if ('privilege' in source && typeof source['privilege'] === 'object') {
          // @ts-expect-error preserve imageUrls
          return source['privilege'] as unknown as Privilege
        } else {
          return {
            createChild: false,
            readChild: false,
            updateSelf: false,
            deleteSelf: false,
          }
        }
      },
    })
    t.field(Post.persona)
    t.field(Post.createdAt)
    t.nonNull.list.field('imageUrls', {
      type: nonNull('String'),
      resolve: (source) => {
        // @ts-expect-error intentionally ignore
        return source['imageUrls'] ?? []
      },
    })
  },
})

const ThreadDef = objectType({
  name: Thread.$name,
  definition(t) {
    t.field(Thread.id)
    t.field(Thread.boardId)
    t.field(Thread.postId)
    t.field(Thread.board)
    t.field(Thread.content)
    t.nonNull.field('privilege', {
      type: PrivilegeDef.name,
      resolve(source) {
        // @ts-expect-error pass privilege from mutation
        if ('privilege' in source && typeof source['privilege'] === 'object') {
          // @ts-expect-error pass privilege from mutation
          return source['privilege'] as unknown as Privilege
        } else {
          return {
            createChild: false,
            readChild: false,
            updateSelf: false,
            deleteSelf: false,
          }
        }
      },
    })
    t.field({
      ...Thread.replies,
      resolve: (source, ...rest) => {
        // @ts-expect-error preserve imageUrls
        if ('replies' in source && Array.isArray(source['replies'])) {
          // @ts-expect-error preserve imageUrls
          return source['replies'] as unknown as PrismaReply[]
        } else {
          return Thread.replies.resolve(source, ...rest)
        }
      },
    })
    t.field(Thread.persona)
    t.field(Thread.createdAt)
    t.nonNull.list.field('imageUrls', {
      type: nonNull('String'),
      resolve: (source) => {
        // @ts-expect-error intentionally ignore
        return source['imageUrls'] ?? []
      },
    })
  },
})

const ReplyDef = objectType({
  name: Reply.$name,
  definition(t) {
    t.field(Reply.id)
    t.field(Reply.threadId)
    t.field(Reply.content)
    t.field(Reply.persona)
    t.field(Reply.createdAt)
    t.nonNull.field('privilege', {
      type: PrivilegeDef.name,
      resolve(source) {
        // @ts-expect-error pass privilege from mutation
        if ('privilege' in source && typeof source['privilege'] === 'object') {
          // @ts-expect-error pass privilege from mutation
          return source['privilege'] as unknown as Privilege
        } else {
          return {
            createChild: false,
            readChild: false,
            updateSelf: false,
            deleteSelf: false,
          }
        }
      },
    })
    t.nonNull.list.field('imageUrls', {
      type: nonNull('String'),
      resolve: (source) => {
        // @ts-expect-error intentionally ignore
        return source['imageUrls'] ?? []
      },
    })
  },
})

const ContentTypeDef = enumType({
  name: ContentType.name,
  members: ContentType.members,
})

const SearchResultDef = objectType({
  name: 'SearchResult',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('kind')
    t.nonNull.string('title')
  },
})

const FollowingBoardDef = objectType({
  name: FollowingBoard.$name,
  definition(t) {
    t.field(FollowingBoard.id)
    t.field(FollowingBoard.boardId)
    t.field(FollowingBoard.board)
    t.field(FollowingBoard.personaId)
    t.field(FollowingBoard.persona)
    t.field(FollowingBoard.createdAt)
    t.field(FollowingBoard.deletedAt)
  },
})

const ThirdPartyAPIKeyTypeDef = enumType({
  name: ThirdPartyAPIKeyType.name,
  members: ThirdPartyAPIKeyType.members,
})

const ThirdPartyAPIKeyDef = objectType({
  name: ThirdPartyAPIKey.$name,
  description: ThirdPartyAPIKey.$description,
  definition(t) {
    t.field(ThirdPartyAPIKey.id)
    t.field(ThirdPartyAPIKey.token)
    t.field(ThirdPartyAPIKey.user)
    t.field(ThirdPartyAPIKey.userId)
    t.field(ThirdPartyAPIKey.createdAt)
    t.field(ThirdPartyAPIKey.revokedAt)
  },
})
const QueryDef = objectType({
  name: 'Query',
  definition(t) {
    t.field('me', {
      type: UserDef.name,
      resolve(_source, _args, context) {
        return context.me
      },
    })
    t.nonNull.field('persona', {
      type: PersonaDef.name,
      args: {
        name: arg({
          type: nonNull('String'),
        }),
      },
      resolve(_source, args, context) {
        return context.prisma.persona.findFirstOrThrow({
          where: {
            name: args.name,
          },
        })
      },
    })
    t.nonNull.list.field('personas', {
      type: PersonaDef.name,
      args: {
        names: arg({
          type: nonNull(list(nonNull('String'))),
        }),
      },
      resolve(_source, args, context) {
        return context.prisma.persona.findMany({
          where: {
            name: {
              in: args.names,
            },
          },
        })
      },
    })
    t.nonNull.boolean('removeUser', {
      args: {
        name: arg({
          type: nonNull('String'),
        }),
      },
      resolve() {
        return false // need to check tokens. wip.
      },
    })
    t.nonNull.field('board', {
      type: BoardDef.name,
      args: {
        id: arg({
          type: nonNull('String'),
        }),
        personaId: arg({
          type: 'Int',
        }),
      },
      async resolve(_source, { id, personaId }, context) {
        const privilege: Privilege = {
          createChild: true,
          readChild: true,
          updateSelf: false,
          deleteSelf: false,
        }
        const board = await context.prisma.board.findFirstOrThrow({
          where: {
            id,
            deletedAt: null,
          },
          include: {
            posts: {
              where: {
                deletedAt: null,
              },
              include: {
                persona: true,
                threads: {
                  include: {
                    persona: true,
                    replies: {
                      include: {
                        persona: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        })

        const boardWithImageUrls = {
          ...board,
          posts: await getPostsWithImageUrls(board.posts, context.prisma),
        }

        if (personaId) {
          const persona = await validatePersona(context.me, personaId, context.prisma)
          return {
            ...boardWithImageUrls,
            posts: boardWithImageUrls.posts.map((post) =>
              postWithPrivilege(post, privilege, persona)
            ),
            privilege,
          }
        } else {
          return {
            ...boardWithImageUrls,
            posts: boardWithImageUrls.posts.map((post) => postWithPrivilege(post, privilege)),
            privilege,
          }
        }
      },
    })
    t.nonNull.list.field('activities', {
      type: nonNull('Post'),
      args: {
        personaId: arg({
          type: 'Int',
        }),
      },
      async resolve(_source, { personaId }, context) {
        const privilege: Privilege = {
          createChild: true,
          readChild: true,
          updateSelf: false,
          deleteSelf: false,
        }
        const posts = await context.prisma.post.findMany({
          where: {
            deletedAt: null,
            board: {
              deletedAt: null,
              defaultBoardRole: {
                read: true,
              },
            },
          },
          include: {
            board: true,
            persona: true,
            threads: {
              where: {
                deletedAt: null,
              },
              include: {
                persona: true,
                replies: {
                  where: {
                    deletedAt: null,
                  },
                  include: {
                    persona: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
        const postsWithImageUrl = await getPostsWithImageUrls(posts, context.prisma)
        if (personaId) {
          const persona = await validatePersona(context.me, personaId, context.prisma)
          return postsWithImageUrl.map((post) => postWithPrivilege(post, privilege, persona))
        } else {
          return postsWithImageUrl.map((post) => postWithPrivilege(post, privilege))
        }
      },
    })
    t.nonNull.field('post', {
      type: PostDef.name,
      args: {
        id: arg({
          type: nonNull('String'),
        }),
        personaId: arg({
          type: 'Int',
        }),
      },
      async resolve(_source, { id, personaId }, context) {
        const privilege: Privilege = {
          createChild: true,
          readChild: true,
          updateSelf: false,
          deleteSelf: false,
        }
        const post = await context.prisma.post.findFirstOrThrow({
          where: {
            id: id,
            deletedAt: null,
            board: {
              deletedAt: null,
            },
          },
          include: {
            board: true,
            persona: true,
            threads: {
              include: {
                persona: true,
                replies: {
                  include: {
                    persona: true,
                  },
                },
              },
            },
          },
        })
        const [postWithImageUrl] = await getPostsWithImageUrls([post], context.prisma)

        if (postWithImageUrl === undefined) {
          throw new Error('Unexpected error!!!')
        }

        if (personaId) {
          const persona = await validatePersona(context.me, personaId, context.prisma)
          if (postWithImageUrl.persona.id === persona.id) {
            privilege.deleteSelf = true
          }
          return {
            ...postWithImageUrl,
            threads: postWithImageUrl.threads.map((thread) => ({
              ...thread,
              privilege: { ...privilege, deleteSelf: thread.personaId === persona.id },
              replies: thread.replies.map((reply) => ({
                ...reply,
                privilege: { ...privilege, deleteSelf: reply.personaId === persona.id },
              })),
            })),
            privilege,
          }
        } else {
          return {
            ...postWithImageUrl,
            threads: postWithImageUrl.threads.map((thread) => ({
              ...thread,
              privilege: { ...privilege },
              replies: thread.replies.map((reply) => ({
                ...reply,
                privilege: { ...privilege },
              })),
            })),
            privilege,
          }
        }
      },
    })
    t.nonNull.list.nonNull.field('search', {
      type: SearchResultDef.name,
      args: {
        query: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, args, context) {
        const result = await context.prisma.board.findMany({
          where: {
            title: {
              startsWith: args.query,
            },
            deletedAt: null,
          },
        })
        return result.map((x) => ({
          kind: 'board',
          title: x.title,
          id: x.id,
        }))
      },
    }),
      t.nonNull.list.nonNull.field('getFollowingBoard', {
        type: FollowingBoardDef.name,
        args: {
          personaId: arg({ type: nonNull('Int') }),
        },
        async resolve(_source, args, context) {
          const result = await context.prisma.followingBoard.findMany({
            where: {
              personaId: {
                equals: args.personaId,
              },
              deletedAt: {
                equals: null,
              },
            },
          })
          return result
        },
      })
  },
})

const MutationDef = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createPersona', {
      type: PersonaDef.name,
      args: {
        screenName: arg({
          type: nonNull('String'),
        }),
        name: arg({
          type: nonNull('String'),
        }),
        iconPath: arg({
          type: 'String',
        }),
      },
      resolve(_source, args, context) {
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        return context.prisma.persona.create({
          data: {
            userId: context.me.id,
            name: args.name,
            iconUrl: args.iconPath ?? 'https://example.com',
            screenName: args.screenName,
          },
        })
      },
    })
    t.nonNull.field('createBoard', {
      type: BoardDef.name,
      args: {
        title: arg({
          type: nonNull('String'),
        }),
        description: arg({
          type: nonNull('String'),
        }),
        personaId: arg({
          type: nonNull('Int'),
        }),
      },
      async resolve(_source, { description, personaId, title }, context) {
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const currentPersona = await validatePersona(context.me, personaId, context.prisma)
        return context.prisma.board.create({
          data: {
            id: ulid(),
            title: title,
            description: description,
            moderators: {
              connect: {
                id: currentPersona.id,
              },
            },
            defaultBoardRole: {
              create: {
                read: true,
                update: true,
              },
            },
            defaultPostRole: {
              create: {
                create: true,
                read: true,
              },
            },
            defaultThreadRole: {
              create: {
                create: true,
                read: true,
              },
            },
            defaultReplyRole: {
              create: {
                create: true,
                read: true,
              },
            },
          },
        })
      },
    })
    t.nonNull.field('createPost', {
      type: PostDef.name,
      args: {
        title: arg({
          type: nonNull('String'),
        }),
        content: arg({
          type: nonNull('String'),
        }),
        contentType: arg({
          type: nonNull(ContentTypeDef.name),
        }),
        personaId: arg({
          type: nonNull('Int'),
        }),
        boardId: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, { boardId, content, contentType, personaId, title }, context) {
        const currentPersona = await validatePersona(context.me, personaId, context.prisma)
        return {
          ...(await context.prisma.post.create({
            data: {
              id: ulid(),
              title: title,
              content: content,
              contentType: contentType,
              persona: {
                connect: {
                  id: currentPersona.id,
                },
              },
              board: {
                connect: {
                  id: boardId,
                },
              },
              defaultPostRole: {
                create: {
                  read: true,
                },
              },
              defaultThreadRole: {
                create: {
                  create: true,
                  read: true,
                },
              },
              defaultReplyRole: {
                create: {
                  create: true,
                  read: true,
                },
              },
            },
            include: {
              persona: true,
            },
          })),
          imageUrls: [],
        }
      },
    })
    t.nonNull.field('createThread', {
      type: ThreadDef.name,
      args: {
        content: arg({
          type: nonNull('String'),
        }),
        contentType: arg({
          type: nonNull(ContentTypeDef.name),
        }),
        boardId: arg({
          type: nonNull('String'),
        }),
        postId: arg({
          type: nonNull('String'),
        }),
        personaId: arg({
          type: nonNull('Int'),
        }),
      },
      async resolve(_source, { boardId, content, contentType, personaId, postId }, context) {
        await validatePersona(context.me, personaId, context.prisma)
        return {
          ...(await context.prisma.thread.create({
            data: {
              id: ulid(),
              content: content,
              contentType: contentType,
              persona: {
                connect: {
                  id: personaId,
                },
              },
              board: {
                connect: {
                  id: boardId,
                },
              },
              Post: {
                connect: {
                  id: postId,
                },
              },
            },
          })),
          imageUrls: [],
        }
      },
    })
    t.nonNull.field('createReply', {
      type: ReplyDef.name,
      args: {
        content: arg({
          type: nonNull('String'),
        }),
        contentType: arg({
          type: nonNull(ContentTypeDef.name),
        }),
        threadId: arg({
          type: nonNull('String'),
        }),
        personaId: arg({
          type: nonNull('Int'),
        }),
      },
      async resolve(_source, { content, contentType, personaId, threadId }, context) {
        await validatePersona(context.me, personaId, context.prisma)
        return {
          ...(await context.prisma.reply.create({
            data: {
              id: ulid(),
              content: content,
              contentType: contentType,
              persona: {
                connect: {
                  id: personaId,
                },
              },
              thread: {
                connect: {
                  id: threadId,
                },
              },
            },
          })),
          imageUrls: [],
        }
      },
    })
    t.nonNull.list.nonNull.field('putAttachedImage', {
      type: FileDef.name,
      args: {
        postId: arg({
          type: nonNull('String'),
        }),
        files: arg({
          type: nonNull(list(nonNull('Upload'))),
        }),
      },
      async resolve(_source, { files, postId }, context) {
        if (typeof context.me?.id === 'undefined' || context.me.id < 1) {
          throw new NotAuthenticatedError('Not Authenticated.')
        }
        const fileUrls = await Promise.all(
          files.map(async (file) => uploadImageFileToS3(file, 'attachedImage'))
        )
        await context.prisma.uploadedImage.createMany({
          data: fileUrls.map((fileUrl) => ({
            id: ulid(),
            parentId: postId,
            fileUrl,
          })),
        })
        return fileUrls.map((fileUrl) => ({ filename: fileUrl }))
      },
    })
    t.nonNull.field('setPersonaIcon', {
      type: FileDef.name,
      args: {
        personaId: arg({
          type: nonNull('Int'),
        }),
        file: arg({
          type: 'Upload',
        }),
      },
      async resolve(_source, { file, personaId }, context) {
        const persona = context.prisma.persona.findFirst({
          where: {
            id: personaId,
          },
          select: {
            user: true,
          },
        })

        if (typeof context.me?.id === 'undefined' || context.me.id < 1) {
          throw new NotAuthenticatedError('Not Authenticated.')
        }
        if (context.me.id !== (await persona.user())?.id) {
          throw new NotAuthorizedError('You do not have permission to edit Persona of the User.')
        }
        const fileUrl = await uploadImageFileToS3(file, 'personaIcon')

        await context.prisma.persona.update({
          where: {
            id: personaId,
          },
          data: {
            iconUrl: fileUrl,
          },
        })
        return {
          filename: fileUrl,
        }
      },
    })
    t.nonNull.field('setTypingStateOnBoard', {
      type: PostDef.name,
      args: {
        personaId: arg({
          type: nonNull('Int'),
        }),
        postId: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, { personaId, postId }, context) {
        const currentPersona = await validatePersona(context.me, personaId, context.prisma)
        const post = await context.prisma.post.findFirst({
          where: {
            id: postId,
            deletedAt: null,
            board: {
              deletedAt: null,
            },
          },
          include: {
            board: true,
            persona: true,
            threads: {
              include: {
                persona: true,
                replies: {
                  include: {
                    persona: true,
                  },
                },
              },
            },
          },
        })

        if (post === null) {
          throw new NotFoundError('Invalid Post id')
        }

        await context.pusher.trigger(postId, 'typing', {
          createdAt: formatISO(new Date()),
          authorPersonaId: personaId,
          authorPersonaScreenName: currentPersona.screenName,
        })

        const [postWithImageUrl] = await getPostsWithImageUrls([post], context.prisma)

        if (postWithImageUrl === undefined) {
          throw new Error('Unexpected error!!!')
        }

        return postWithImageUrl
      },
    })
    t.nonNull.field('deletePost', {
      type: PostDef.name,
      args: {
        personaId: arg({
          type: nonNull('Int'),
        }),
        postId: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, { personaId, postId }, context) {
        const currentPersona = await validatePersona(context.me, personaId, context.prisma)
        const post = await context.prisma.post.findFirst({
          where: {
            id: postId,
            deletedAt: null,
          },
          include: {
            board: {
              include: {
                defaultPostRole: true,
                moderators: true,
              },
            },
            defaultPostRole: true,
            persona: true,
          },
        })

        if (post === null) {
          throw new NotFoundError('Invalid Post id')
        }

        if (!hasPriviledgeToDeletePost(currentPersona, post)) {
          throw new NotAuthorizedError('You do not have permission to delete post.')
        }
        return context.prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            deletedAt: new Date(),
          },
        })
      },
    })
    t.nonNull.field('createFollowingBoard', {
      type: FollowingBoardDef.name,
      args: {
        personaId: arg({
          type: nonNull('Int'),
        }),
        boardId: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, { personaId, boardId }, context) {
        await validatePersona(context.me, personaId, context.prisma)
        const board = await context.prisma.board.findFirst({
          where: {
            id: boardId,
          },
        })
        if (board === null) {
          throw new Error('Board was not found')
        }

        // Workaround for MySQL, which does not apply unique constraint for null columns.
        const alreadyFollowingTheBoard = await context.prisma.followingBoard.findMany({
          where: {
            boardId: {
              equals: boardId,
            },
            personaId: {
              equals: personaId,
            },
            deletedAt: {
              equals: null,
            },
          },
        })
        if (alreadyFollowingTheBoard.length > 0) {
          const existing = alreadyFollowingTheBoard[0]
          if (typeof existing === 'undefined') {
            throw new Error('unexpected')
          }
          return existing
        }
        const created = await context.prisma.followingBoard.create({
          data: {
            id: ulid(),
            boardId: boardId,
            personaId: personaId,
          },
        })
        return created
      },
    })
    t.nonNull.field('createThirdPartyAPIKey', {
      type: ThirdPartyAPIKeyDef.name,
      args: {
        type: arg({
          type: nonNull(ThirdPartyAPIKeyType.name),
        }),
      },
      async resolve(_source, { type }, context) {
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const key = await context.prisma.thirdPartyAPIKey.create({
          data: {
            id: ulid(),
            user: {
              connect: {
                id: context.me.id,
              },
            },
            token: ulid(),
            type,
          },
        })
        if (key === null) {
          throw new Error('Failed to generate third-party key')
        }
        return key
      },
    })
    t.nonNull.field('unfollowBoard', {
      type: FollowingBoardDef.name,
      args: {
        personaId: arg({
          type: nonNull('Int'),
        }),
        boardId: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, { personaId, boardId }, context) {
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        await validatePersona(context.me, personaId, context.prisma)
        const board = await context.prisma.board.findFirst({
          where: {
            id: boardId,
          },
        })
        if (board === null) {
          throw new Error('Board was not found')
        }
        await context.prisma.followingBoard.updateMany({
          where: {
            boardId: {
              equals: boardId,
            },
            personaId: {
              equals: personaId,
            },
            deletedAt: {
              equals: null,
            },
          },
          data: {
            deletedAt: new Date(),
          },
        })
        const originalFollowingBoard = (
          await context.prisma.followingBoard.findMany({
            where: {
              boardId: {
                equals: boardId,
              },
              personaId: {
                equals: personaId,
              },
            },
            orderBy: {
              deletedAt: 'desc',
            },
          })
        )[0]
        if (typeof originalFollowingBoard === 'undefined') {
          throw new Error('unexpected error')
        }
        return originalFollowingBoard
      },
    })
  },
})

export {
  AllowedWritingRoleDef,
  FileDef,
  UserDef,
  BoardDef,
  PostDef,
  PersonaDef,
  PrivilegeDef,
  ThreadDef,
  ReplyDef,
  ContentTypeDef,
  SearchResultDef,
  FollowingBoardDef,
  ThirdPartyAPIKeyDef,
  ThirdPartyAPIKeyTypeDef,
  QueryDef,
  MutationDef,
}
