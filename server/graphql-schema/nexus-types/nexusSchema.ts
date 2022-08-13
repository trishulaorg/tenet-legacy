import { list, objectType, enumType, arg } from 'nexus'

const File = objectType({
  name: 'File',
  definition(t) {
    t.nonNull.string('filename'), t.nonNull.string('mimetype'), t.nonNull.string('encoding')
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.list.field('personas', {
      type: 'Persona',
      resolve(_source, _args, ctx) {
        return ctx.prisma.persona.findMany({})
      },
    })
  },
})

const Persona = objectType({
  name: 'Persona',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('screenName')
    t.nonNull.string('iconUrl')
  },
})

const Board = objectType({
  name: 'Board',
  definition(t) {
    arg({
      type: 'String',
    })
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.list.field('posts', {
      type: 'Post',
      resolve(_source, _args, ctx) {
        return ctx.prisma.post.findMany({})
      },
    })
    t.nonNull.date('createdAt')
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('boardId')
    t.nonNull.field('board', {
      type: 'Board',
      resolve(_source, _args, ctx) {
        return ctx.prisma.board.findFirst({})
      },
    })
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.list.field('threads', {
      type: 'Thread',
      resolve(_source, _args, ctx) {
        return ctx.prisma.thread.findMany({})
      },
    })
    t.nonNull.field('persona', {
      type: 'Persona',
      resolve(_source, _args, ctx) {
        return ctx.prisma.persona.findFirst({})
      },
    })
    t.nonNull.date('createdAt')
    t.nonNull.list.field('imageUrls', {
      type: 'String',
    })
  },
})

const Thread = objectType({
  name: 'Thread',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('boardId')
    t.nonNull.field('board', {
      type: 'Board',
      resolve(_source, _args, ctx) {
        return ctx.prisma.board.findFirst({})
      },
    })
    t.nonNull.string('content')
    t.nonNull.list.field('replies', {
      type: 'Reply',
      resolve(_source, _args, ctx) {
        return ctx.prisma.reply.findFirst({})
      },
    })
    t.nonNull.field('persona', {
      type: 'Persona',
      resolve(_source, _args, ctx) {
        return ctx.prisma.persona.findFirst({})
      },
    })
    t.nonNull.date('createdAt')
    t.nonNull.list.field('imageUrls', {
      type: 'String',
    })
  },
})

const Reply = objectType({
  name: 'Reply',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('boardId')
    t.nonNull.string('content')
    t.nonNull.field('persona', {
      type: 'Persona',
      resolve(_source, _args, ctx) {
        return ctx.prisma.persona.findFirst({})
      },
    })
    t.nonNull.date('createdAt')
    t.nonNull.list.field('imageUrls', {
      type: 'String',
    })
  },
})

const ContentType = enumType({
  name: 'ContentType',
  members: ['TEXT', 'LINK', 'IMAGE', 'VIDEO', 'EMOJI'],
})

const SearchResult = objectType({
  name: 'SearchResult',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('kind')
    t.nonNull.string('title')
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.field('me', {
      type: 'User',
      resolve(_source, _args, ctx) {
        return ctx.prisma.user.findFirst({})
      },
    })
    t.nonNull.field('persona', {
      type: 'Persona',
      args: {
        name: arg({
          type: 'String',
        }),
      },
      resolve(_source, _args, ctx) {
        return ctx.prisma.persona.findFirst({})
      },
    })
    t.nonNull.list.field('personas', {
      type: list('Persona'),
      args: {
        names: arg({
          type: list('String'),
        }),
      },
      resolve(_source, _args, ctx) {
        return ctx.prisma.persona.findMany({})
      },
    })
    t.nonNull.boolean('removeUser', {
      args: {
        name: arg({
          type: 'String',
        }),
      },
      resolve() {
        return false
      },
    })
    t.nonNull.field('board', {
      type: 'Board',
      args: {
        id: arg({
          type: 'String',
        }),
      },
      resolve(_source, _args, ctx) {
        return ctx.prisma.board.findFirst({})
      },
    })
    t.nonNull.list.field('activities', {
      type: list('Post'),
      resolve(_source, _args, ctx) {
        return ctx.prisma.post.findMany({})
      },
    })
    t.nonNull.list.field('post', {
      type: list('Post'),
      args: {
        id: arg({
          type: 'String',
        }),
      },
      resolve(_source, _args, ctx) {
        return ctx.prisma.post.findMany({})
      },
    })
    t.nonNull.list.field('search', {
      type: 'SearchResult',
      args: {
        query: arg({
          type: 'String',
        }),
      },
      resolve() {
        return [
          {
            kind: 'aaa',
            id: 'bbb',
            title: 'ccc',
          },
        ]
      },
    })
  },
})

export { File, User, Board, Post, Persona, Thread, Reply, ContentType, SearchResult, Query }
