import type { Lesson } from '../types/lesson'

type ReviewPanelProps = {
  lesson: Lesson
  completed: boolean
  onCompleteLesson: () => void
}

export function ReviewPanel({ lesson, completed, onCompleteLesson }: ReviewPanelProps) {
  return (
    <>
      <div className="section-head review-head">
        <h2>复盘问题</h2>
      </div>
      <div className="qa-list">
        {lesson.review.map((item, index) => (
          <details className="qa-card" key={item.question}>
            <summary>
              <span>Q{index + 1}</span>
              {item.question}
            </summary>
            <div className="qa-answer">
              <strong>参考答案</strong>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <button
        className={completed ? 'complete-button done' : 'complete-button'}
        type="button"
        onClick={onCompleteLesson}
        disabled={completed}
      >
        {completed ? '已完成' : '标记完成'}
      </button>
    </>
  )
}
