// Write storybook story about <Primitives>
import type { Meta } from '@storybook/react'
import { Heading1, Heading2, Heading3, Paragraph } from '../../ui/common/Primitives'

export default {
  title: 'Common/Primitives',
  component: Heading1,
} as Meta

// Write storybook story about <Heading1>
export const Heading1Story = () => <Heading1>Rolem ipusum</Heading1>

// Write storybook story about <Heading2>
export const Heading2Story = () => <Heading2>Rolem ipusum</Heading2>

// Write storybook story about <Heading3>
export const Heading3Story = () => <Heading3>Rolem ipusum</Heading3>

// Write storybook story about <Paragraph>
export const ParagraphStory = () => <Paragraph>Rolem ipusum</Paragraph>
