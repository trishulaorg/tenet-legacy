import type { FC } from 'react'

const PageBaseLayout: FC = ({ children }) => (
  <div className="bg-pagebg h-max min-h-screen">{children}</div>
)

export { PageBaseLayout }
