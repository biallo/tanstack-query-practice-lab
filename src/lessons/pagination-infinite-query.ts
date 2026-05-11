import type { Lesson } from '../types/lesson'

export const paginationInfiniteQuery: Lesson = {
  id: 'pagination-infinite-query',
  number: '09',
  title: '分页与无限滚动',
  level: '实践',
  summary: '处理列表分页、保留上一页数据和无限滚动加载，避免切页时 UI 闪烁或重复请求。',
  concepts: [
    {
      title: '页码必须进入 queryKey',
      detail: 'page、pageSize、筛选条件都会影响列表结果，应作为 queryKey 的一部分。',
    },
    {
      title: 'placeholderData 保持界面稳定',
      detail: '切换页码时可以先展示上一页数据，等新页请求完成再替换，避免列表突然变空。',
    },
    {
      title: 'useInfiniteQuery 管理页集合',
      detail: '无限滚动不再只是一页数据，而是 pages 数组。getNextPageParam 决定下一页游标。',
    },
  ],
  example: {
    title: '页码分页与无限滚动',
    language: 'tsx',
    code: `const issuesQuery = useQuery({
  queryKey: ['issues', { page, status }],
  queryFn: () => getIssues({ page, status }),
  // 切页时保留上一页，避免列表闪成 loading 空状态
  placeholderData: (previousData) => previousData,
})

const feedQuery = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => getFeedPage(pageParam),
  initialPageParam: null,
  // 服务端返回 nextCursor 时才允许继续加载
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})`,
  },
  review: [
    {
      question: '为什么 page 必须进入 queryKey？',
      answer: '不同页码对应不同列表结果。如果 key 不包含 page，切页时会复用错误缓存。',
    },
    {
      question: 'placeholderData 解决什么体验问题？',
      answer: '它让新数据加载期间继续展示上一份数据，减少页面闪烁和布局跳动。',
    },
    {
      question: 'useInfiniteQuery 的 getNextPageParam 为什么重要？',
      answer: '它告诉 TanStack Query 下一页的游标或页码是什么，没有返回值时通常表示没有更多数据。',
    },
    {
      question: '无限滚动适合所有列表吗？',
      answer: '不适合。需要精确跳页、对比页码或强 SEO 的列表通常更适合普通分页。',
    },
  ],
}
