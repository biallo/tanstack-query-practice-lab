import type { Lesson } from '../types/lesson'

export const cacheUpdatePatterns: Lesson = {
  id: 'cache-update-patterns',
  number: '16',
  title: '缓存更新模式对比',
  level: '工程',
  summary: '比较 invalidateQueries、setQueryData、setQueriesData 和乐观更新，形成清晰的缓存更新决策。',
  concepts: [
    {
      title: '失效适合不确定结果',
      detail: '当 mutation 影响范围较大或服务端会重新计算结果时，invalidateQueries 更稳。',
    },
    {
      title: '直接写缓存适合确定结果',
      detail: '当响应已经返回完整实体，setQueryData 可以立即更新详情页或列表中的对应项。',
    },
    {
      title: '批量写缓存要谨慎',
      detail: 'setQueriesData 能更新多份匹配缓存，但必须确保不会破坏不同筛选条件下的列表语义。',
    },
  ],
  example: {
    title: '选择合适的缓存同步方式',
    language: 'tsx',
    code: `const updateIssue = useMutation({
  mutationFn: saveIssue,
  onSuccess: (savedIssue) => {
    // 响应里有完整详情，详情缓存可以直接更新
    queryClient.setQueryData(['issue', savedIssue.id], savedIssue)

    // 列表可能受筛选、排序、统计影响，交给服务端重新计算更稳
    queryClient.invalidateQueries({ queryKey: ['issues'] })
  },
})`,
  },
  review: [
    {
      question: '什么时候优先 invalidateQueries？',
      answer: '当结果由服务端重新排序、过滤、聚合，或 mutation 影响范围不确定时，失效重取更可靠。',
    },
    {
      question: '什么时候优先 setQueryData？',
      answer: '当你已经拿到完整、可信的新数据，并且能明确对应到某个缓存 key 时，可以直接写缓存。',
    },
    {
      question: '为什么列表缓存比详情缓存更难手动更新？',
      answer: '列表通常受筛选、排序、分页和权限影响，单个实体变化可能改变它是否属于当前列表以及所在位置。',
    },
    {
      question: '乐观更新和 setQueryData 是什么关系？',
      answer: '乐观更新通常就是在 mutation 确认前先用 setQueryData 写入预测结果，失败时再回滚。',
    },
  ],
}
