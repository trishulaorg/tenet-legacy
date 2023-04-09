import type { ComponentStory, Meta } from '@storybook/react'
import { SearchBox } from '@/src/ui/common/SearchBox'

export default {
  title: 'common/SearchBox',
  component: SearchBox,
} as Meta

export const Default: ComponentStory<typeof SearchBox> = () => {
  return <SearchBox />
}
