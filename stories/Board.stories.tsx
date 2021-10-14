import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Board } from '../ui/board/Board'
import { BoardState, BoardStateContext, PostState } from '../states/PostState'
import { PersonaState } from '../states/UserState'

export default {
  title: 'Board/Board',
  component: Board,
} as Meta

const post1 = new PostState('Post 1', 'Default Content', new PersonaState('test1'), Date.now())
const post2 = new PostState('Thread 1', 'Thread Content', new PersonaState('test2'), Date.now())
post2.addResponse(new PostState('Reply 1', 'Reply content', new PersonaState('test3'), Date.now()))
post1.addResponse(post2)
post1.addResponse(
  new PostState('Thread 2', 'Thread Content', new PersonaState('test2'), Date.now())
)
post1.addResponse(
  new PostState('Thread 3', 'Thread Content', new PersonaState('test3'), Date.now())
)
const board = new BoardState(0, {
  title: 'Test Board',
  description: 'Board Description',
  posts: [post1, post1, post1],
})

const Template: Story = () => {
  return (
    <BoardStateContext.Provider value={board}>
      <Board />
    </BoardStateContext.Provider>
  )
}
export const DefaultBoard = Template.bind({})
DefaultBoard.args = {}
