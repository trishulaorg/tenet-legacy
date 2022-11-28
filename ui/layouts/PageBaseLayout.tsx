import type { FC } from 'react'

const PageBaseLayout: FC = ({ children }) => (
  <div className="bg-pagebg dark:bg-pagebg-dark transition-colors duration-350 h-max min-h-screen">
    {children}
  </div>
)

export { PageBaseLayout }
