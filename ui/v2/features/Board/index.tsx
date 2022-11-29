// import { useContext } from "react"
// import { BoardStateContext } from "../../../../states/PostState"
import BoardHeader from './BoardHeader/index'

/* TO DO: 
    - Implement buttons prop & pass type, onClick()
    - Style header background, followers, follow button (see Figma)
    - Import vs posts and map posts from board state to v2 post component
        - Revise v2 post component styling
     */
/*
type BoardProps = {
    showPostCreate?: boolean
    followButtonType?: 'follow' | 'unfollow'
    onFollowButtonClick?: () => Promise<void>
  }
*/

//   const FollowButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
//     <WithPrimaryButtonStyling>
//       <button onClick={onClick} className="flex block py-2 -my-2 px-2 -mx-2 md:px-4 md:-mx-4 lg:px-6 lg:-mx-6">
//         <PlusCircleIcon width={24} />
//         <span className="px-2">Follow</span>
//       </button>
//     </WithPrimaryButtonStyling>
//   )
  
//   const UnfollowButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
//     <WithPrimaryButtonStyling>
//       <button onClick={onClick} className="flex block py-2 -my-2 px-2 -mx-2 md:px-4 md:-mx-4 lg:px-6 lg:-mx-6">
//         <MinusCircleIcon width={24} />
//         <span className="px-2">Unfollow</span>
//       </button>
//     </WithPrimaryButtonStyling>
//   )

export default function Board(/*props: BoardProps*/) {
    // const { showPostCreate = true, FollowButtonType = 'follow', onFollowButtonClick } = props
    // const state = useContext(BoardStateContext)
    return (
      <>
          <div>
            <BoardHeader  />
          </div>
      </>
    )
  }