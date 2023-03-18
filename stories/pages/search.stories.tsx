import type { getSdk } from '@/generated/types'
import { createApiClientImpl } from '@/infrastructure/apiClientImpl'
import type { SearchQuery } from '@/models/search/SearchQuery'
import type { ComponentStory } from '@storybook/react'
import { ComponentMeta } from '@storybook/react'
import { aSearchResult } from '../../generated/mocks'
import SearchResultPage from '../../pages/search/[word]'

export default {
  title: 'Pages/SearchResultPage',
  component: SearchResultPage,
  args: {
    searchData: await createApiClientImpl({
      ...({} as ReturnType<typeof getSdk>),
      async Search() {
        return {
          search: Array(10)
            .fill(null)
            .map((_, i) => aSearchResult({ id: i.toString(), title: `Search result ${i + 1}` })),
        }
      },
    }).search({ query: 'test' as SearchQuery }),
  },
} satisfies ComponentMeta<typeof SearchResultPage>

export const Default: ComponentStory<typeof SearchResultPage> = (args) => (
  <SearchResultPage {...args} />
)
