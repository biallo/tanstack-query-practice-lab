import type { ReactNode } from 'react'
import type { Lesson } from '../types/lesson'

const codeTokenPattern =
  /(\/\/.*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:const|let|var|return|if|else|async|await|function|import|from|export|type|interface|new)\b|\b(?:true|false|null|undefined)\b|\b\d[\d_]*\b|\b(?:useQuery|useSuspenseQuery|useInfiniteQuery|useMutation|useQueryClient|queryOptions|QueryClient|QueryClientProvider|HydrationBoundary|ReactQueryDevtools|Suspense|ErrorBoundary|prefetchQuery|invalidateQueries|refetchQueries|removeQueries|resetQueries|setQueryData|setQueriesData|cancelQueries|getQueryData|dehydrate|createRoot)\b|[A-Za-z_$][\w$]*(?=\s*:)|[A-Za-z_$][\w$]*(?=\s*\())/g

function getCodeTokenClass(token: string) {
  if (token.startsWith('//') || token.startsWith('/*')) return 'code-token comment'
  if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) return 'code-token string'
  if (/^(true|false|null|undefined)$/.test(token)) return 'code-token literal'
  if (/^\d/.test(token)) return 'code-token number'
  if (
    /^(useQuery|useSuspenseQuery|useInfiniteQuery|useMutation|useQueryClient|queryOptions|QueryClient|QueryClientProvider|HydrationBoundary|ReactQueryDevtools|Suspense|ErrorBoundary|prefetchQuery|invalidateQueries|refetchQueries|removeQueries|resetQueries|setQueryData|setQueriesData|cancelQueries|getQueryData|dehydrate|createRoot)$/.test(
      token,
    )
  ) {
    return 'code-token api'
  }
  if (/^(const|let|var|return|if|else|async|await|function|import|from|export|type|interface|new)$/.test(token)) {
    return 'code-token keyword'
  }
  if (/^[A-Za-z_$][\w$]*$/.test(token)) return 'code-token symbol'
  return 'code-token'
}

function highlightCodeLine(line: string, lineIndex: number) {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of line.matchAll(codeTokenPattern)) {
    const token = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      nodes.push(line.slice(lastIndex, index))
    }

    nodes.push(
      <span className={getCodeTokenClass(token)} key={`${lineIndex}-${index}-${token}`}>
        {token}
      </span>,
    )
    lastIndex = index + token.length
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex))
  }

  return nodes
}

function highlightCode(code: string) {
  return code.split('\n').map((line, index) => (
    <span className="code-line" key={`${index}-${line}`}>
      {highlightCodeLine(line, index)}
    </span>
  ))
}

type CodeBlockProps = {
  example: Lesson['example']
}

export function CodeBlock({ example }: CodeBlockProps) {
  return (
    <article className="code-card">
      <div className="code-title">
        <span>{example.title}</span>
        <small>{example.language}</small>
      </div>
      <pre>
        <code>{highlightCode(example.code)}</code>
      </pre>
    </article>
  )
}
