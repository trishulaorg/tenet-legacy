import Link from 'next/link'
import React from 'react'
import { SvgLogo } from '@/src/ui/common/SvgLogo'
import classNames from 'classnames'

export const Title: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <h1 className={classNames('text-8xl text-[#58A9BC] my-auto', className)}>
      <Link href="/">
        <SvgLogo />
      </Link>
    </h1>
  )
}
