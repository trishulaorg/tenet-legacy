import type { Post, Reply, Thread } from '@prisma/client'
import type { PrismaClient } from '@prisma/client'

const getPostsWithImageUrls = async <
  T extends Post & { threads: (Thread & { replies: Reply[] })[] }
>(
  posts: T[],
  prismaClient: PrismaClient
): Promise<
  (T & {
    imageUrls: string[]
    threads: { imageUrls: string[]; replies: { imageUrls: string[] }[] }[]
  })[]
> => {
  const imageParentIds = posts
    .map((post) => [
      post.id,
      post.threads.map((thread) => thread.id),
      post.threads.map((thread) => thread.replies.map((reply) => reply.id)),
    ])
    .flat()
    .flat()
    .flat()

  const uploadedImages = await prismaClient.uploadedImage.findMany({
    where: {
      parentId: {
        in: imageParentIds,
      },
    },
    orderBy: {
      id: 'desc',
    },
  })

  const imageUrlsAdded = posts.map((post) => ({
    ...post,
    imageUrls: uploadedImages
      .filter((uploadedImage) => uploadedImage.parentId === post.id)
      .map((uploadedImage) => uploadedImage.fileUrl),
    threads: post.threads.map((thread) => ({
      ...thread,
      imageUrls: uploadedImages
        .filter((uploadedImage) => uploadedImage.parentId === thread.id)
        .map((uploadedImage) => uploadedImage.fileUrl),
      replies: thread.replies.map((reply) => ({
        ...reply,
        imageUrls: uploadedImages
          .filter((uploadedImage) => uploadedImage.parentId === reply.id)
          .map((uploadedImage) => uploadedImage.fileUrl),
      })),
    })),
  }))

  return imageUrlsAdded
}

export { getPostsWithImageUrls }
