import type { SearchResultId } from './SearchResultId'
import type { SearchResultIdKind } from './SearchResultIdKind'
import type { SearchResultTitle } from './SearchResultTitle'

export type SearchResult = {
  __typename?: 'SearchResult'
  kind: SearchResultIdKind
  id: SearchResultId
  title: SearchResultTitle
}
