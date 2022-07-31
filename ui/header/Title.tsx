import Link from 'next/link'
import React from 'react'
import { SvgLogo } from '../common/SvgLogo'

export const Title: React.FC = () => {
  return (
    <h1 className="flex-1 text-7xl text-[#58A9BC] my-auto">
      <Link href="/">
        <a>
          <SvgLogo />
        </a>
      </Link>
    </h1>
  )
}
