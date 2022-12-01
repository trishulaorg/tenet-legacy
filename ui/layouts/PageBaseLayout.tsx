import type { FC } from 'react'
import React from 'react'

const PageBaseLayout: FC = ({ children }) => (
  <div className="transition-colors duration-350 h-max min-h-screen">
    <div
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        filter: 'blur(5px)',
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}
    />

    {children}
  </div>
)

export { PageBaseLayout }
