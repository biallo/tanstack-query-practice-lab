import type { Lesson } from '../types/lesson'

export const typescriptQueryDesign: Lesson = {
  id: 'typescript-query-design',
  number: '17',
  title: 'TypeScript 与 API 类型设计',
  level: '工程',
  summary: '为 queryFn、queryKey 和 options 建立类型边界，减少组件里散落的字符串 key 与 any 数据。',
  concepts: [
    {
      title: '让 queryFn 返回稳定类型',
      detail: 'API client 应该在边界层解析响应，让组件拿到明确的业务类型，而不是 unknown 或 any。',
    },
    {
      title: '封装 query options',
      detail: '把 queryKey、queryFn、staleTime 等放进函数，组件只传业务参数，减少重复和拼写错误。',
    },
    {
      title: '集中管理 key 工厂',
      detail: 'key 工厂能让详情、列表、失效和预取共享同一套 key 结构。',
    },
  ],
  example: {
    title: '封装类型安全的查询配置',
    language: 'tsx',
    code: `type Issue = {
  id: string
  title: string
}

const issueKeys = {
  all: ['issues'] as const,
  detail: (id: string) => ['issues', id] as const,
}

function issueOptions(id: string) {
  return queryOptions({
    queryKey: issueKeys.detail(id),
    // queryFn 返回 Promise<Issue>，组件里的 data 会自动得到 Issue 类型
    queryFn: () => getIssue(id),
  })
}

const issueQuery = useQuery(issueOptions(issueId))`,
  },
  review: [
    {
      question: '为什么要封装 query options？',
      answer: '它能复用 key、queryFn 和默认策略，减少组件重复声明，也让预取和 useQuery 使用同一份配置。',
    },
    {
      question: 'key 工厂解决什么问题？',
      answer: '它把缓存地址集中管理，降低字符串拼错、层级不一致和失效范围写错的概率。',
    },
    {
      question: '为什么 API 边界层要返回明确类型？',
      answer: '组件依赖明确类型才能得到可靠补全和类型检查，避免把接口解析错误扩散到 UI 层。',
    },
  ],
}
