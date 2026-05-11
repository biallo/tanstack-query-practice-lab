import type { Lesson } from '../types/lesson'

export const enabledDependentQueries: Lesson = {
  id: 'enabled-dependent-queries',
  number: '08',
  title: 'enabled 与依赖查询',
  level: '实践',
  summary: '用 enabled 控制查询何时启动，处理“先拿用户，再拿详情”这类有依赖关系的数据读取。',
  concepts: [
    {
      title: 'enabled 控制自动执行',
      detail: 'enabled 为 false 时，query 不会自动请求。它适合等待必要参数、登录状态或上一步查询结果。',
    },
    {
      title: 'queryKey 仍要包含参数',
      detail: '即使通过 enabled 控制时机，真正影响数据身份的 userId、teamId 等参数仍然要进入 queryKey。',
    },
    {
      title: '避免在 queryFn 里猜参数',
      detail: '不要让 queryFn 接收可能为空的业务参数后再自行兜底。更清晰的做法是在 enabled 层阻止请求。',
    },
  ],
  example: {
    title: '用户加载后再请求项目',
    language: 'tsx',
    code: `const userQuery = useQuery({
  queryKey: ['viewer'],
  queryFn: getViewer,
})

const projectsQuery = useQuery({
  queryKey: ['projects', userQuery.data?.id],
  queryFn: () => getProjects(userQuery.data!.id),
  // userId 不存在时不要发请求，避免 /projects?userId=undefined
  enabled: Boolean(userQuery.data?.id),
})`,
  },
  review: [
    {
      question: 'enabled: false 会删除已有缓存吗？',
      answer: '不会。enabled 只影响自动请求时机，已有缓存仍然可以被读取和展示。',
    },
    {
      question: '为什么 userId 已经在 enabled 里判断，还要放进 queryKey？',
      answer: '因为 userId 决定项目列表的数据身份。不同用户的项目列表必须对应不同缓存地址。',
    },
    {
      question: '依赖查询最常见的风险是什么？',
      answer: '参数尚未准备好就发出请求，导致无意义请求、错误日志或把错误数据写进缓存。',
    },
  ],
}
