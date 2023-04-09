import * as React from 'react'
import type { Meta, Story } from '@storybook/react/types-6-0'
import { SvgLogo } from '@/src/ui/common/SvgLogo'

export default {
  title: 'common/SvgLogo',
  component: SvgLogo,
} as Meta

const Template: Story = () => <SvgLogo />

export const Default = Template.bind({})
