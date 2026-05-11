import type { Lesson } from '../types/lesson'

export const suspenseErrorBoundary: Lesson = {
  id: 'suspense-error-boundary',
  number: '13',
  title: 'Suspense 与错误边界',
  level: '进阶',
  summary: '用 useSuspenseQuery、Suspense 和 Error Boundary 把加载态与错误兜底从业务组件中拆出去。',
  concepts: [
    {
      title: 'useSuspenseQuery 保证 data 存在',
      detail: '在 Suspense 边界内，组件拿到的 data 通常已经准备好，减少大量 isPending 分支。',
    },
    {
      title: '加载态交给 Suspense',
      detail: '组件等待数据时由 fallback 渲染加载 UI，业务组件更专注于成功态。',
    },
    {
      title: '错误边界处理失败态',
      detail: '查询失败可以抛给 Error Boundary，由页面或模块级边界统一展示恢复入口。',
    },
  ],
  example: {
    title: 'Suspense 查询边界',
    language: 'tsx',
    code: `function Profile() {
  const { data } = useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  // 使用 useSuspenseQuery 后，这里可以专注成功态
  return <h1>{data.name}</h1>
}

function ProfileRoute() {
  return (
    <ErrorBoundary fallback={<ErrorView />}>
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
    </ErrorBoundary>
  )
}`,
  },
  review: [
    {
      question: 'useSuspenseQuery 带来的主要简化是什么？',
      answer: '它把等待数据的状态交给 Suspense，让业务组件不必手写首屏 pending 分支。',
    },
    {
      question: 'Suspense 是否替代错误处理？',
      answer: '不能。Suspense 处理等待，错误仍需要 Error Boundary 或组件内错误 UI 承接。',
    },
    {
      question: '什么时候不适合上 Suspense？',
      answer: '当页面需要细粒度混合加载、局部错误恢复或团队尚未建立错误边界模式时，普通 useQuery 更直观。',
    },
  ],
}
