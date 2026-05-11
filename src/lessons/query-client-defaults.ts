import type { Lesson } from '../types/lesson'

export const queryClientDefaults: Lesson = {
  id: 'query-client-defaults',
  number: '10',
  title: 'QueryClient 默认策略',
  level: '工程',
  summary: '在项目入口统一配置 retry、staleTime、gcTime 和窗口聚焦刷新策略，减少每个组件重复声明。',
  concepts: [
    {
      title: 'defaultOptions 是项目基线',
      detail: '常用的缓存新鲜度、重试次数和刷新策略应在 QueryClient 上统一配置，再按查询局部覆盖。',
    },
    {
      title: 'staleTime 与 gcTime 分工不同',
      detail: 'staleTime 决定数据多久算新鲜；gcTime 决定无订阅缓存多久后被垃圾回收。',
    },
    {
      title: '重试策略要贴近业务',
      detail: '网络抖动可以重试，权限错误和参数错误通常不该重试。',
    },
  ],
  example: {
    title: '设置全局查询默认值',
    language: 'tsx',
    code: `const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1 分钟内视为新鲜，组件重新挂载不会立刻请求
      staleTime: 60_000,
      // 无组件使用后，缓存最多保留 10 分钟
      gcTime: 10 * 60_000,
      // 失败重试 2 次，适合普通网络抖动
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})`,
  },
  review: [
    {
      question: 'staleTime 和 gcTime 的区别是什么？',
      answer: 'staleTime 控制新鲜度，gcTime 控制未被使用的缓存多久后从内存移除。',
    },
    {
      question: '为什么默认配置不应过于激进？',
      answer: '全局配置会影响整个应用。过长 staleTime 或过多 retry 都可能让旧数据和请求压力扩大到所有页面。',
    },
    {
      question: '什么时候需要局部覆盖默认配置？',
      answer: '当某个接口的数据新鲜度、重试策略或刷新时机明显不同于项目基线时，应在该 query 上覆盖。',
    },
  ],
}
