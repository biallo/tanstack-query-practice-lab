import type { Lesson } from '../types/lesson'

export const devtools: Lesson = {
  id: 'devtools',
  number: '14',
  title: 'React Query Devtools',
  level: '工具',
  summary: '用 Devtools 查看 queryKey、缓存状态、数据更新时间和重新请求行为，降低调试成本。',
  concepts: [
    {
      title: '观察缓存比猜状态可靠',
      detail: 'Devtools 能看到每个 query 的 key、状态、数据、stale 情况和最后更新时间。',
    },
    {
      title: '适合学习和开发环境',
      detail: '学习项目可以默认打开，生产项目通常只在开发环境挂载。',
    },
    {
      title: '辅助定位重复请求',
      detail: '当页面频繁请求时，可以通过 Devtools 判断 queryKey 是否变化、staleTime 是否过短。',
    },
  ],
  example: {
    title: '开发环境挂载 Devtools',
    language: 'tsx',
    code: `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      {/* 只在开发环境展示调试面板，避免影响生产 UI */}
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  )
}`,
  },
  review: [
    {
      question: 'Devtools 最适合排查什么问题？',
      answer: '适合排查 queryKey 是否正确、缓存是否过期、为什么重复请求、mutation 后哪些查询被刷新。',
    },
    {
      question: '为什么生产环境通常不默认展示 Devtools？',
      answer: '它是调试工具，会暴露缓存数据和内部状态，也会增加界面复杂度。',
    },
    {
      question: '学习 TanStack Query 为什么应该看 Devtools？',
      answer: '因为缓存、stale、fetching 等概念在面板里可视化后，比只看代码更容易理解。',
    },
  ],
}
