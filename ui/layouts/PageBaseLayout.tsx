import type { ReactNode } from 'react'

export const PageBaseLayout = ({ children }: { children: ReactNode }) => (
  <div className="transition-colors duration-350 h-max min-h-screen">
    <div
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: 'cover',
        filter: 'blur(3px)',
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
    {children}
  </div>
)
