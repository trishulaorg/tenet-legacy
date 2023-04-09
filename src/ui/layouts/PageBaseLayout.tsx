import type { ReactElement } from 'react'

export const PageBaseLayout = ({
  children,
  header,
}: {
  children: ReactElement
  header: ReactElement
}): ReactElement => (
  <div className="flex flex-col transition-colors duration-350 h-max min-h-screen">
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
    <header className="shrink-0">{header}</header>
    {/* height: 0 because we want to specify the height relative to the main child element. */}
    <main className="grow h-0">{children}</main>
  </div>
)
