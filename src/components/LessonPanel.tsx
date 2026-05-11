import type { Lesson, LessonTab } from '../types/lesson'
import { ExplanationPanel } from './ExplanationPanel'
import { ReviewPanel } from './ReviewPanel'

type LessonPanelProps = {
  activeTab: LessonTab
  completed: boolean
  lesson: Lesson
  onCompleteLesson: () => void
}

export function LessonPanel({ activeTab, completed, lesson, onCompleteLesson }: LessonPanelProps) {
  return (
    <section className="panel">
      {activeTab === 'explain' ? (
        <ExplanationPanel lesson={lesson} />
      ) : (
        <ReviewPanel completed={completed} lesson={lesson} onCompleteLesson={onCompleteLesson} />
      )}
    </section>
  )
}
