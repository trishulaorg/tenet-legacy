import type { FC } from 'react'

const PageBaseLayout: FC = ({ children }) => (
  <div className="bg-gray-100 h-max min-h-screen">{children}</div>
)

export { PageBaseLayout }
