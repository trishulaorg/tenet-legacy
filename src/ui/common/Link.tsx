import NextLink from 'next/link'

export const Link: React.FC<{
  href: string
}> = ({ children, href }) => (
  <NextLink className="text-blue-500 hover:underline dark:text-blue-400" href={href}>
    {children}
  </NextLink>
)
