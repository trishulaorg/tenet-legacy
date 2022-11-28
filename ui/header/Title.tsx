import Link from 'next/link'
import React from 'react'
import { SvgLogo } from '../common/SvgLogo'

export const Title: React.FC = () => {
  return (
    <h1 className="flex-1 text-8xl text-[#58A9BC] my-auto">
      <Link href="/">
        <SvgLogo />
      </Link>
    </h1>
  )
}
