import type { FC } from 'react'
import type { GetFollowingBoardQuery } from '../../server/generated-files/frontend-graphql-definition'
import Link from 'next/link'

interface FollowingBoardCardProps {
  boards: GetFollowingBoardQuery['getFollowingBoard']
}

const FollowingBoardCard: FC<FollowingBoardCardProps> = ({ boards }) => {
  if (boards.length === 0) {
    return null
  }
  return (
    <div className="rounded overflow-hidden shadow-lg my-2 py-2 px-2 bg-white">
      <table>
        <tbody>
          <tr className="font-bold text-xl mb-2">Following Boards:</tr>
          {boards.map((board) => (
            <tr className="text-gray-700 text-base" key={`following_${board.board.id}`}>
              <Link href={'/board/' + board.board.id}>{board.board.title}</Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { FollowingBoardCard }
