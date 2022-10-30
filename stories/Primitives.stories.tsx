import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { PageBaseLayout } from '../ui/layouts/PageBaseLayout'
import { Heading1, Heading2, Heading3, Paragraph } from '../ui/common/Primitives'

export default {
  title: 'Primitives/Primitives',
  component: PageBaseLayout,
  subcomponents: { Heading1, Heading2, Heading3 },
} as Meta

const Template: Story = () => {
  return (
    <PageBaseLayout noStyling>
      <Heading1>Heading 1</Heading1>
      <Heading2>Heading 2</Heading2>
      <Heading3>Heading 3</Heading3>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi velit laboriosam cum
        voluptatem repellendus quasi nam reiciendis perferendis odio excepturi ex, voluptatibus
        praesentium doloremque, a eius labore quas officia?
      </Paragraph>
    </PageBaseLayout>
  )
}

export const DefaultPrimitives = Template.bind({})
DefaultPrimitives.args = {}
