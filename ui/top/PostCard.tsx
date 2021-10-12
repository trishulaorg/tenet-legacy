import React from 'react'
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AnnotationIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/react/solid'
import { UserIcon } from '../common/UserIcon'

export const PostCard = (props: any) => {
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white">
      <h2 className="text-3xl pb-2">{props.post.title}</h2>
      <div className="flex items-center pb-2">
        <UserIcon size={'small'} />
        <p className="pl-1">{props.post.author.name}</p>
      </div>
      <div className="px-8 pb-8">
        <p>{props.post.content}</p>
      </div>
      <div className="flex">
        <div className="flex items-center opacity-50">
          <TrendingUpIcon className="h-5 w-5" />
          <p className="pl-1">1500</p>
        </div>
        <div className="flex items-center pl-1 opacity-50">
          <TrendingDownIcon className="h-5 w-5" />
          <p className="pl-1">1500</p>
        </div>
        <div className="flex items-center pl-4 opacity-50">
          <AnnotationIcon className="h-5 w-5" />
          <p className="pl-1">1k Comment</p>
        </div>
        <div className="flex items-center pl-4 opacity-50">
          <ShareIcon className="h-5 w-5" />
          <p className="pl-1">Share</p>
        </div>
        <div className="flex items-center pl-4 opacity-50">
          <BookmarkIcon className="h-5 w-5" />
          <p className="pl-1">Save</p>
        </div>
      </div>
    </div>
  )
}
