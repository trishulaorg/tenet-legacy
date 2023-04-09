import classNames from 'classnames'

export const Card: React.FC<{
  className?: string
}> = ({ children, className }) => (
  <div className={classNames(className, 'p-4 bg-white rounded-md shadow-md dark:bg-gray-800')}>
    {children}
  </div>
)
