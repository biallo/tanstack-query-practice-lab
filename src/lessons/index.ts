import { cacheUpdatePatterns } from './cache-update-patterns'
import { devtools } from './devtools'
import { enabledDependentQueries } from './enabled-dependent-queries'
import { errorRetry } from './error-retry'
import { invalidationStrategy } from './invalidation-strategy'
import { keys } from './keys'
import { mentalModel } from './mental-model'
import { mutations } from './mutations'
import { optimistic } from './optimistic'
import { paginationInfiniteQuery } from './pagination-infinite-query'
import { prefetch } from './prefetch'
import { queryClientDefaults } from './query-client-defaults'
import { queryLifecycle } from './query-lifecycle'
import { ssrHydration } from './ssr-hydration'
import { suspenseErrorBoundary } from './suspense-error-boundary'
import { tanstackQueryIntro } from './tanstack-query-intro'
import { typescriptQueryDesign } from './typescript-query-design'

export const lessons = [
  tanstackQueryIntro,
  mentalModel,
  queryLifecycle,
  keys,
  mutations,
  optimistic,
  prefetch,
  enabledDependentQueries,
  paginationInfiniteQuery,
  queryClientDefaults,
  errorRetry,
  invalidationStrategy,
  suspenseErrorBoundary,
  devtools,
  ssrHydration,
  cacheUpdatePatterns,
  typescriptQueryDesign,
]
