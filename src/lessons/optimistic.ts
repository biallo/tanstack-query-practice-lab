import type { Lesson } from '../types/lesson'

export const optimistic: Lesson = {
  id: 'optimistic',
  number: '06',
  title: '乐观更新',
  level: '进阶',
  summary: '在低风险交互中先更新缓存，再在失败时回滚，让界面响应更快。',
  concepts: [
    {
      title: '先取消相关查询',
      detail: 'onMutate 中 cancelQueries 可以避免后台请求覆盖即将写入的乐观数据。',
    },
    {
      title: '保存快照',
      detail: '修改缓存前保存旧数据，失败时用 onError 回滚到 mutation 之前的状态。',
    },
    {
      title: '最终仍要同步',
      detail: 'onSettled 中通常会 invalidateQueries，确保最终数据与服务端一致。',
    },
  ],
  example: {
    title: '收藏按钮乐观更新',
    language: 'tsx',
    code: `useMutation({
  mutationFn: toggleStar,
  onMutate: async (id) => {
    // 避免正在进行的列表请求覆盖乐观结果
    await queryClient.cancelQueries({ queryKey: ['repos'] })
    const previous = queryClient.getQueryData(['repos'])
    // 先把预测结果写进缓存，让 UI 立即响应
    queryClient.setQueryData(['repos'], updateStar(id))
    return { previous }
  },
  onError: (_error, _id, context) => {
    // 服务端拒绝时回滚到 mutation 前的快照
    queryClient.setQueryData(['repos'], context?.previous)
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['repos'] }),
})`,
  },
  review: [
    {
      question: '乐观更新适合所有写入吗？',
      answer: '不适合。支付、权限、库存等高风险操作更应该等待服务端确认，再更新界面。',
    },
    {
      question: '为什么要保留 previous 快照？',
      answer: '失败时需要恢复 mutation 前的缓存，否则 UI 会停留在一个服务端并未接受的状态。',
    },
    {
      question: '为什么乐观更新前常要 cancelQueries？',
      answer: '如果后台请求正好返回旧数据，可能覆盖刚写入的乐观结果。取消相关查询能降低这种竞争风险。',
    },
    {
      question: 'onSettled 中再次失效有什么价值？',
      answer: '无论成功还是失败，最终都让缓存与服务端重新对齐，避免乐观数据或回滚状态长期停留。',
    },
    {
      question: '什么类型的交互更适合乐观更新？',
      answer: '点赞、收藏、开关偏好这类失败率低、可回滚、影响范围清晰的交互更适合乐观更新。',
    },
  ],
}
