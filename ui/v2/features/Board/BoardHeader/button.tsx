import ChatIcon from '@heroicons/react/solid/ChatIcon'
import MinusCircleIcon from '@heroicons/react/solid/MinusCircleIcon'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import Link from 'next/link'

type BoardButtonProps = {
  buttonType?: 'follow' | 'unfollow' | 'post'
  buttonOnClick?: () => Promise<void>
  id?: string /* board ID for post button */
}

export default function BoardButton(props: BoardButtonProps) {
  const { buttonType = 'follow', buttonOnClick, id } = props
  const buttonLabel = {
    'follow' : 'Follow',
    'unfollow' : 'Unfollow',
    'post' : 'New Post'
  }
  const buttonIcon = {
    'follow' : <PlusCircleIcon width={24} />,
    'unfollow' : <MinusCircleIcon width={24} />,
    'post' : <ChatIcon width={24} />
  }
  return (
    <div>
      <div className={'flex ml-auto'}>
        <div className='my-2 py-2 px-2 md:px-4 ml-2 lg:px-6 block text-white hover:bg-primary-dark rounded-full bg-primary transition-colors'>
        <Link href={buttonType == "post" ? { pathname: `/o/cp`, query: { boardId: id } } : "#"} legacyBehavior>
          <button
            onClick={buttonOnClick}
            className="flex block py-2 -my-2 px-2 -mx-2 md:px-4 md:-mx-4 lg:px-6 lg:-mx-6"
          >
            {buttonIcon[buttonType]}
            <span className="px-2 font-semibold">{buttonLabel[buttonType]}</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
