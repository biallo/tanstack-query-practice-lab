import type { Lesson } from '../types/lesson'

export const errorRetry: Lesson = {
  id: 'error-retry',
  number: '11',
  title: '错误处理与重试',
  level: '工程',
  summary: '区分可恢复错误和业务错误，设计局部错误 UI、条件重试和全局错误处理边界。',
  concepts: [
    {
      title: '错误 UI 要贴近查询范围',
      detail: '列表失败不一定要让整页崩溃。局部查询错误应在局部展示重试入口。',
    },
    {
      title: 'retry 可以是函数',
      detail: '根据失败次数、HTTP 状态码或错误类型决定是否继续重试，避免对 401、403、404 反复请求。',
    },
    {
      title: 'throwOnError 连接错误边界',
      detail: '严重错误可以抛给 Error Boundary，普通接口错误则在组件内展示。',
    },
  ],
  example: {
    title: '按状态码决定是否重试',
    language: 'tsx',
    code: `const userQuery = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUser(userId),
  retry: (failureCount, error) => {
    // 权限和不存在通常重试也不会成功
    if (error.status === 401 || error.status === 403 || error.status === 404) {
      return false
    }

    // 网络抖动或 5xx 最多重试 2 次
    return failureCount < 2
  },
})`,
  },
  review: [
    {
      question: '为什么 401/403 通常不应该自动重试？',
      answer: '它们通常代表认证或权限状态不满足，重复请求不会改变结果，反而浪费资源。',
    },
    {
      question: '局部错误 UI 的价值是什么？',
      answer: '它能把失败限制在对应区域，其他数据和操作仍可使用，用户也能明确知道重试哪一块。',
    },
    {
      question: '什么时候把错误交给 Error Boundary？',
      answer: '当错误意味着当前页面无法继续可靠展示，或需要统一兜底体验时，可以通过 throwOnError 交给错误边界。',
    },
  ],
}
