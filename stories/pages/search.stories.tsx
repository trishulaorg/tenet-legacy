import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aSearchResult } from '../../generated/mocks'
import SearchResultPage from '../../pages/search/[word]'

export default {
  title: 'Pages/SearchResultPage',
  component: SearchResultPage,
  args: {
    searchData: Array(10)
      .fill(null)
      .map((_, i) => aSearchResult({ id: i.toString(), title: `Search result ${i + 1}` })),
  },
} satisfies ComponentMeta<typeof SearchResultPage>

export const Default: ComponentStory<typeof SearchResultPage> = (args) => (
  <SearchResultPage {...args} />
)
