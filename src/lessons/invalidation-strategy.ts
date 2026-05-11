import type { Lesson } from '../types/lesson'

export const invalidationStrategy: Lesson = {
  id: 'invalidation-strategy',
  number: '12',
  title: 'Query 失效策略',
  level: '工程',
  summary: '系统比较 invalidateQueries、refetchQueries、removeQueries 和 resetQueries，选择合适的缓存同步手段。',
  concepts: [
    {
      title: 'invalidateQueries 标记过期',
      detail: '它不会立刻删除数据，而是让匹配查询变 stale，并按活跃状态触发重新获取。',
    },
    {
      title: 'refetchQueries 主动重取',
      detail: '当你明确需要马上重新请求一组查询时，refetchQueries 比仅标记过期更直接。',
    },
    {
      title: 'remove/reset 更有破坏性',
      detail: 'removeQueries 会移除缓存；resetQueries 会回到初始状态。它们更适合登出、租户切换等边界场景。',
    },
  ],
  example: {
    title: '按范围失效和清理缓存',
    language: 'tsx',
    code: `const queryClient = useQueryClient()

function afterTaskUpdated(projectId: string) {
  // 只让当前项目任务列表过期，避免刷新整个应用
  queryClient.invalidateQueries({
    queryKey: ['projects', projectId, 'tasks'],
  })
}

function logout() {
  // 登出时移除用户相关缓存，避免下个用户看到旧数据
  queryClient.removeQueries({ queryKey: ['viewer'] })
  queryClient.removeQueries({ queryKey: ['projects'] })
}`,
  },
  review: [
    {
      question: 'invalidateQueries 和 removeQueries 的核心区别是什么？',
      answer: 'invalidateQueries 保留数据并标记过期；removeQueries 会直接从缓存中移除匹配查询。',
    },
    {
      question: '为什么失效范围不应过宽？',
      answer: '过宽会导致无关请求增加、页面频繁刷新，也可能让用户正在看的数据产生不必要跳动。',
    },
    {
      question: '登出时为什么常用 removeQueries？',
      answer: '登出会改变数据访问主体，旧用户缓存继续留在内存里可能造成隐私和展示错误。',
    },
  ],
}
