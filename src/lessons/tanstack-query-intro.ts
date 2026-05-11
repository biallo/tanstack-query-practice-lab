import type { Lesson } from '../types/lesson'

export const tanstackQueryIntro: Lesson = {
  id: 'tanstack-query-intro',
  number: '01',
  title: '认识 TanStack Query',
  level: '入门',
  summary:
    '了解 TanStack Query 解决的问题、适用边界，以及它为什么是 React 项目里管理服务端状态的常用工具。',
  concepts: [
    {
      title: '它解决异步服务端状态',
      detail:
        'TanStack Query 面向接口数据、远端缓存、请求状态和重新同步，不负责表单输入、弹窗开关这类纯本地 UI 状态。',
    },
    {
      title: '它不是请求库',
      detail:
        'fetch、axios 或 RPC client 负责真正发请求；TanStack Query 负责围绕请求结果建立缓存、重试、失效和刷新策略。',
    },
    {
      title: '它让数据读取声明化',
      detail:
        '组件声明 queryKey、queryFn 和缓存策略，库负责在挂载、聚焦、重连、失效等时机协调请求。',
    },
    {
      title: 'React Query 是 React 适配',
      detail:
        '@tanstack/react-query 提供 useQuery、useMutation、QueryClientProvider 等 React 绑定 API。',
    },
  ],
  example: {
    title: '应用入口接入 QueryClient',
    language: 'tsx',
    code: `// QueryClient 持有整个应用的查询缓存和默认策略
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)`,
  },
  review: [
    {
      question: 'TanStack Query 主要管理哪类状态？',
      answer:
        '它主要管理服务端状态，也就是来自接口、数据库或远端服务的数据快照，以及围绕这些数据的加载、错误、缓存和同步状态。',
    },
    {
      question: '为什么说 TanStack Query 不是请求库？',
      answer:
        '它不会限制你用 fetch 还是 axios。真正的网络请求由 queryFn 执行，TanStack Query 管理请求结果和缓存生命周期。',
    },
    {
      question: '什么时候不应该把状态放进 TanStack Query？',
      answer:
        '输入框内容、展开面板、当前 tab、临时筛选草稿等只属于当前界面的本地状态，通常继续用 React state 更直接。',
    },
    {
      question: 'QueryClientProvider 的作用是什么？',
      answer:
        '它把 QueryClient 放进 React 上下文，让组件树中的 useQuery、useMutation 等 hook 能访问同一套缓存和默认配置。',
    },
  ],
}
