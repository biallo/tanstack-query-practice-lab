import type { Lesson } from '../types/lesson'

export const queryLifecycle: Lesson = {
  id: 'query-lifecycle',
  number: '03',
  title: 'Query 生命周期',
  level: '基础',
  summary: '理解 pending、success、error、stale、fetching 的区别，避免把加载状态写得过于粗糙。',
  concepts: [
    {
      title: 'status 描述有没有数据',
      detail: 'pending、success、error 关注查询结果状态，适合决定首屏、错误页和正常内容。',
    },
    {
      title: 'fetchStatus 描述是否正在请求',
      detail: '组件已有数据时也可能在后台刷新。此时 status 仍是 success，但 isFetching 为 true。',
    },
    {
      title: 'staleTime 控制新鲜度',
      detail: 'staleTime 内的数据被视为新鲜，组件重新挂载时不会立刻重新请求，适合降低重复请求。',
    },
  ],
  example: {
    title: '区分首屏加载和后台刷新',
    language: 'tsx',
    code: `if (query.isPending) return <Skeleton />
if (query.isError) return <ErrorView error={query.error} />

return (
  <Course data={query.data} refreshing={query.isFetching} />
)`,
  },
  review: [
    {
      question: 'isPending 和 isFetching 有什么区别？',
      answer: 'isPending 表示还没有可用数据；isFetching 表示正在执行请求，已有数据时也可能为 true。',
    },
    {
      question: 'staleTime 不是越长越好吗？',
      answer: '不是。它应匹配业务可接受的数据新鲜度，越长越省请求，但越可能展示旧数据。',
    },
    {
      question: '为什么已有数据时仍可能显示刷新状态？',
      answer: 'React Query 可以一边展示缓存数据，一边在后台请求新数据。这样不会把页面退回到空白加载态。',
    },
  ],
}
