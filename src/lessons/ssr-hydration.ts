import type { Lesson } from '../types/lesson'

export const ssrHydration: Lesson = {
  id: 'ssr-hydration',
  number: '15',
  title: 'SSR 与 Hydration 基础',
  level: '进阶',
  summary: '理解服务端预取、dehydrate、HydrationBoundary 和客户端接管，避免 SSR 页面重复请求。',
  concepts: [
    {
      title: '服务端先预取',
      detail: 'SSR 框架中可以在服务端创建 QueryClient 并 prefetchQuery，把首屏需要的数据提前准备好。',
    },
    {
      title: 'dehydrate 序列化缓存',
      detail: 'dehydrate 会把服务端缓存转成可传给客户端的状态，客户端再通过 HydrationBoundary 恢复。',
    },
    {
      title: '客户端继续接管',
      detail: 'hydration 后，客户端仍由 TanStack Query 管理缓存新鲜度、后台刷新和 mutation。',
    },
  ],
  example: {
    title: 'SSR 预取并注水',
    language: 'tsx',
    code: `const queryClient = new QueryClient()

await queryClient.prefetchQuery({
  queryKey: ['post', postId],
  queryFn: () => getPost(postId),
})

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    {/* 客户端 useQuery 使用同一个 queryKey，可直接复用服务端缓存 */}
    <PostPage postId={postId} />
  </HydrationBoundary>
)`,
  },
  review: [
    {
      question: 'SSR 中 dehydrate 的作用是什么？',
      answer: '它把服务端 QueryClient 中的缓存转成可序列化状态，让客户端恢复同一份首屏数据。',
    },
    {
      question: '为什么客户端 queryKey 必须和服务端预取一致？',
      answer: '只有 key 一致，客户端 useQuery 才能命中服务端注入的缓存，避免重复首屏请求。',
    },
    {
      question: 'hydration 后数据还会刷新吗？',
      answer: '会。注水只是提供初始缓存，后续是否刷新仍由 staleTime、聚焦、失效等策略决定。',
    },
  ],
}
