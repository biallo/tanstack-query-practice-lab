import type { Lesson } from '../types/lesson'
import { CodeBlock } from './CodeBlock'

type ExplanationPanelProps = {
  lesson: Lesson
}

export function ExplanationPanel({ lesson }: ExplanationPanelProps) {
  return (
    <>
      <div className="section-head">
        <h2>核心讲解</h2>
      </div>
      <div className="concept-list">
        {lesson.concepts.map((concept) => (
          <article className="concept-card" key={concept.title}>
            <h3>{concept.title}</h3>
            <p>{concept.detail}</p>
          </article>
        ))}
      </div>

      <div className="section-head code-head">
        <h2>代码示例</h2>
      </div>
      <CodeBlock example={lesson.example} />
    </>
  )
}
