import type { FC } from 'react'
import Link from 'next/link'

type Board = {
  board: {
    id: string
    title: string
  }
}

const FollowingBoardCard: FC<{ boards: Board[] }> = ({ boards }) => {
  if (boards.length === 0) {
    return null
  }
  return (
    <div className="rounded overflow-hidden shadow-lg my-2 py-2 px-2 bg-contentbg dark:bg-contentbg-dark transition-colors duration-350">
      <table>
        <tbody>
          <tr className="font-bold text-xl text-high dark:text-high-dark mb-2">
            Following Boards:
          </tr>
          {boards.map((board: Board) => (
            <tr
              className="text-med dark:text-med-dark text-base"
              key={`following_${board.board.id}`}
            >
              <Link href={'/board/' + board.board.id} legacyBehavior>
                {board.board.title}
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { FollowingBoardCard }
