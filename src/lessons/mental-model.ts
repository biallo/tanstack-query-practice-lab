import type { Lesson } from '../types/lesson'

export const mentalModel: Lesson = {
  id: 'mental-model',
  number: '02',
  title: 'Server State 心智模型',
  level: '基础',
  summary: '区分 client state 与 server state，理解为什么 TanStack Query 负责缓存、同步和异步状态。',
  concepts: [
    {
      title: 'Server State 不是全局状态',
      detail:
        '它属于远端数据源，可能被其他用户、后台任务或服务端逻辑改变。前端只持有一份带生命周期的快照。',
    },
    {
      title: 'Query 负责读取与同步',
      detail:
        'useQuery 把请求状态、缓存数据、错误、重试、后台刷新等分散逻辑收束到一个声明式 API。',
    },
    {
      title: 'queryKey 是缓存地址',
      detail:
        '同一个 queryKey 会复用同一份缓存。把业务身份放进 key，比把 URL 字符串散落在组件中更稳定。',
    },
  ],
  example: {
    title: '声明一个课程查询',
    language: 'tsx',
    code: `const lessonQuery = useQuery({
  // queryKey 是这份远端数据的缓存地址
  queryKey: ['lesson', lessonId],
  queryFn: () => fetchLesson(lessonId),
  // 60 秒内重新挂载组件不会立刻重新请求
  staleTime: 60_000,
})`,
  },
  review: [
    {
      question: '为什么 server state 不能简单等同于 React state？',
      answer:
        'React state 只描述本地 UI，而 server state 有远端来源、过期时间、重试和多组件共享读取的问题。',
    },
    {
      question: 'queryKey 的主要价值是什么？',
      answer: '它给缓存建立稳定地址，让 TanStack Query 能复用、刷新、失效和预取特定数据。',
    },
    {
      question: '为什么远端数据需要“过期”概念？',
      answer:
        '因为服务端数据可能在前端不知道的情况下被别人改变。过期概念能帮助 UI 在展示旧快照和重新同步之间取得平衡。',
    },
  ],
}
