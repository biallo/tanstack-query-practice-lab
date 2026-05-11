import type { Lesson } from '../types/lesson'

export const mutations: Lesson = {
  id: 'mutations',
  number: '05',
  title: 'Mutation 与缓存失效',
  level: '实践',
  summary: '用 useMutation 处理写入，把提交状态、错误处理和成功后的缓存同步放到明确位置。',
  concepts: [
    {
      title: 'Mutation 负责写入',
      detail: '创建、更新、删除等会改变服务端数据的操作，用 useMutation 比在按钮里手写状态更稳。',
    },
    {
      title: 'invalidateQueries',
      detail: '写入成功后让相关 query 失效，TanStack Query 会在需要时重新读取最新数据。',
    },
    {
      title: 'setQueryData',
      detail: '当服务端返回了完整的新数据，可以直接写入缓存，减少一次额外请求。',
    },
  ],
  example: {
    title: '创建后刷新列表',
    language: 'tsx',
    code: `const queryClient = useQueryClient()

const createTodo = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})`,
  },
  review: [
    {
      question: '什么时候用 invalidateQueries？',
      answer: '当写入会让某些读取结果过期，且你希望下次读取拿到服务端最新结果时使用。',
    },
    {
      question: '什么时候直接 setQueryData 更合适？',
      answer: '当 mutation 响应已经包含缓存所需数据，直接写入能让 UI 更快更新并减少请求。',
    },
    {
      question: '为什么 mutation 成功后不能只改按钮状态？',
      answer: '写入通常会影响后续读取的数据。如果只改当前按钮，列表、详情或统计等其他缓存仍可能展示旧结果。',
    },
    {
      question: 'invalidateQueries 会立即删除数据吗？',
      answer:
        '不会。它会把匹配的查询标记为失效，并在活跃查询需要同步时触发重新获取，旧数据通常还能先展示。',
    },
  ],
}
