// import { useContext } from "react"
// import { BoardStateContext } from "../../../../states/PostState"
import { useContext } from 'react'
import { BoardStateContext } from '../../../../states/PostState'
import BoardHeader from './BoardHeader/index'
import BoardDescription from './description'
// import Post from '../Post/index'
import { Post } from '../../../post/Post'
/* TO DO: 
    - Implement buttons prop & pass type, onClick()
    - Style header background, followers, follow button (see Figma)
    - Import v2 posts and map posts from board state to v2 post component
        - Revise v2 post component styling
     */

type BoardProps = {
  showPostCreate?: boolean
  followButtonType?: 'follow' | 'unfollow'
  onFollowButtonClick?: () => Promise<void>
}

export default function Board(props: BoardProps) {
  const { showPostCreate = false, followButtonType = 'follow', onFollowButtonClick } = props
  const state = useContext(BoardStateContext)
  return (
    <>
      <div>
        <BoardHeader
          title={state.title}
          id={state.id}
          followButtonType={followButtonType}
          onFollowButtonClick={onFollowButtonClick as any}
          showPostCreate={showPostCreate}
        />
      </div>
      <div>
        <BoardDescription text={state.description} />
      </div>
      <div>
        <ul>
          {state.posts.map((p, idx) => (
            <li key={idx} className="mb-5">
              <Post post={p} showThreads={false} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
