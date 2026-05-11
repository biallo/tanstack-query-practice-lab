import type { Lesson } from '../types/lesson'

export const prefetch: Lesson = {
  id: 'prefetch',
  number: '07',
  title: '预取与路由体验',
  level: '实践',
  summary: '用 prefetchQuery 在用户真正进入页面前准备数据，让导航更接近即时响应。',
  concepts: [
    {
      title: '在意图出现时预取',
      detail: '鼠标悬停、列表项可见、即将跳转等信号，都适合触发 prefetchQuery。',
    },
    {
      title: '预取也受 staleTime 影响',
      detail: '如果预取数据仍然新鲜，进入页面时可以直接复用缓存，不必立即请求。',
    },
    {
      title: '不要无差别预取',
      detail: '预取应该服务高概率下一步路径。大量低概率预取会浪费网络和服务端资源。',
    },
  ],
  example: {
    title: '悬停预取详情',
    language: 'tsx',
    code: `const queryClient = useQueryClient()

function prefetchLesson(id: string) {
  queryClient.prefetchQuery({
    queryKey: ['lesson', id],
    queryFn: () => fetchLesson(id),
    // 用户真正进入详情页时，5 分钟内可直接复用预取结果
    staleTime: 5 * 60_000,
  })
}`,
  },
  review: [
    {
      question: '预取和直接请求有什么区别？',
      answer: '预取把数据提前放进缓存，用户进入目标视图时可以复用，减少可感知等待。',
    },
    {
      question: '预取为什么不能越多越好？',
      answer: '过度预取会消耗带宽、增加服务端压力，还可能缓存用户根本不会访问的数据。',
    },
    {
      question: 'staleTime 会怎样影响预取效果？',
      answer:
        '如果用户进入页面时预取数据仍然新鲜，页面可以直接复用缓存；如果已经过期，则可能立刻后台刷新。',
    },
  ],
}
