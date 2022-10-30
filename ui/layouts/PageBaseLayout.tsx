import type { FC } from 'react'

const PageBaseLayout: FC<{ noStyling?: boolean }> = ({ noStyling, children }) => (
  <div className={noStyling ? '' : 'bg-gray-100 h-max min-h-screen'}>{children}</div>
)

export { PageBaseLayout }
