import React from 'react'
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AnnotationIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/react/solid'
import { UserIcon } from '../common/UserIcon'

export const PostCard = () => {
  return (
    <div className="max-w-2xl rounded-lg p-4 bg-white">
      <h2 className="text-3xl pb-2">Post Title</h2>
      <div className="flex items-center pb-2">
        <UserIcon size={'small'} />
        <p className="pl-1">username</p>
      </div>
      <div className="px-8 pb-8">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ...
        </p>
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
