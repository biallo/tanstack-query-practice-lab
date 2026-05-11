import type { Lesson } from '../types/lesson'

export const keys: Lesson = {
  id: 'keys',
  number: '04',
  title: '设计 queryKey',
  level: '工程',
  summary: '用数组 key 表达资源、参数和作用域，为后续预取、失效和并发读取打好基础。',
  concepts: [
    {
      title: '从宽到窄组织 key',
      detail:
        "例如 ['projects']、['projects', projectId]、['projects', projectId, 'tasks']，方便按范围失效。",
    },
    {
      title: '把筛选条件放进 key',
      detail: 'page、status、search、sort 等会影响结果的数据，都应该进入 queryKey。',
    },
    {
      title: '稳定性优先',
      detail: '避免把每次渲染都会变化的对象直接塞进 key。必要时先规范化参数结构。',
    },
  ],
  example: {
    title: '列表查询 key',
    language: 'tsx',
    code: `useQuery({
  queryKey: ['issues', { status, page, assigneeId }],
  queryFn: () => getIssues({ status, page, assigneeId }),
})`,
  },
  review: [
    {
      question: '为什么筛选条件必须进入 queryKey？',
      answer: '因为不同筛选条件对应不同结果。如果 key 相同，缓存会复用错误的数据。',
    },
    {
      question: '数组 key 比字符串拼接更适合什么场景？',
      answer: '数组 key 更容易表达层级和参数，按前缀失效、预取和调试也更清晰。',
    },
    {
      question: 'queryKey 中对象参数需要注意什么？',
      answer:
        '要保持参数含义稳定，避免放入每次渲染都变化的临时值。筛选对象最好只包含真正影响请求结果的字段。',
    },
  ],
}
