import { list, objectType, enumType, arg, nonNull } from 'nexus'
import { getPostsWithImageUrls } from './getImageUrls'
import {
  defaultNotAuthenticatedErrorMessage,
  NotAuthenticatedError,
} from '../../errors/NotAuthenticatedError'
import { defaultNotFoundErrorMessage, NotFoundError } from '../../errors/NotFoundError'
import { ulid } from 'ulid'
import { uploadImageFileToS3 } from '../../fileUpload/uploadImageFileToS3'
import { NotAuthorizedError } from '../../errors/NotAuthorizedError'
import { formatISO } from 'date-fns'
import { Board, ContentType, Persona, Post, Reply, Thread, User } from 'nexus-prisma'
import type { Thread as PrismaThread } from '@prisma/client'
import type { Post as PrismaPost, Reply as PrismaReply } from '@prisma/client'

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

const BoardDef = objectType({
  name: Board.$name,
  definition(t) {
    arg({
      type: nonNull('String'),
    })
    t.field(Board.id)
    t.field(Board.title)
    t.field(Board.description)
    t.field(Board.posts)
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
      resolve(_source, args) {
        console.log(args)
        return false // need to check tokens. wip.
      },
    })
    t.nonNull.field('board', {
      type: BoardDef.name,
      args: {
        id: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, args, context) {
        const board = await context.prisma.board.findFirstOrThrow({
          where: {
            id: args.id,
          },
          include: {
            posts: {
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
        return boardWithImageUrls
      },
    })
    t.nonNull.list.field('activities', {
      type: nonNull('Post'),
      async resolve(_source, _args, context) {
        const posts = await context.prisma.post.findMany({
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

        return posts.map((post) => {
          return { ...post, imageUrls: [] }
        })
      },
    })
    t.nonNull.field('post', {
      type: PostDef.name,
      args: {
        id: arg({
          type: nonNull('String'),
        }),
      },
      async resolve(_source, args, context) {
        const post = await context.prisma.post.findFirstOrThrow({
          where: {
            id: args.id,
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

        return postWithImageUrl
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
          },
        })
        return result.map((x) => ({
          kind: 'board',
          title: x.title,
          id: x.id,
        }))
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
      async resolve(_source, args, context) {
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const currentPersona = await context.prisma.persona.findFirst({
          where: {
            user: {
              id: context.me.id,
            },
            id: args.personaId,
          },
        })
        if (!currentPersona) {
          throw new NotFoundError('Invalid persona id')
        }
        return context.prisma.board.create({
          data: {
            id: ulid(),
            title: args.title,
            description: args.description,
            moderators: {
              connect: {
                id: currentPersona.id,
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
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const currentPersona = await context.prisma.persona.findFirst({
          where: { userId: context.me.id, id: personaId },
        })
        if (!currentPersona) {
          throw new NotFoundError(defaultNotFoundErrorMessage('Persona', 'id', personaId))
        }
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
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const currentPersona = await context.prisma.persona.findFirst({
          where: { userId: context.me.id, id: personaId },
        })
        if (!currentPersona) {
          throw new NotFoundError(defaultNotFoundErrorMessage('Persona', 'id', personaId))
        }
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
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const currentPersona = await context.prisma.persona.findFirst({
          where: { userId: context.me.id, id: personaId },
        })
        if (!currentPersona) {
          throw new NotFoundError(defaultNotFoundErrorMessage('Persona', 'id', personaId))
        }
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
        if (!context.me) {
          throw new NotAuthenticatedError(defaultNotAuthenticatedErrorMessage)
        }
        const currentPersona = await context.prisma.persona.findFirst({
          where: {
            user: {
              id: context.me.id,
            },
            id: personaId,
          },
        })
        if (!currentPersona) {
          throw new NotFoundError('Invalid persona id')
        }
        const post = await context.prisma.post.findFirst({
          where: {
            id: postId,
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
        /*
         * Pusher integration
         */

        const author = await context.prisma.persona.findFirst({
          where: {
            id: personaId,
          },
        })

        await context.pusher.trigger(postId, 'typing', {
          createdAt: formatISO(new Date()),
          authorPersonaId: personaId,
          authorPersonaScreenName: author?.screenName,
        })

        const [postWithImageUrl] = await getPostsWithImageUrls([post], context.prisma)

        if (postWithImageUrl === undefined) {
          throw new Error('Unexpected error!!!')
        }

        return postWithImageUrl
      },
    })
  },
})

export {
  FileDef,
  UserDef,
  BoardDef,
  PostDef,
  PersonaDef,
  ThreadDef,
  ReplyDef,
  ContentTypeDef,
  SearchResultDef,
  QueryDef,
  MutationDef,
}
