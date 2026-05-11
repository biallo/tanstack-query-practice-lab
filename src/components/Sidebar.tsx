import type { Lesson } from '../types/lesson'

type SidebarProps = {
  lessons: Lesson[]
  selectedLessonId: string
  completedLessons: Set<string>
  completedPercent: number
  onPrefetchLesson: (lessonId: string) => void
  onSelectLesson: (lessonId: string) => void
}

export function Sidebar({
  lessons,
  selectedLessonId,
  completedLessons,
  completedPercent,
  onPrefetchLesson,
  onSelectLesson,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-fixed">
        <div className="brand">
          <img src={`${import.meta.env.BASE_URL}apple-touch-icon.png`} alt="" />
          <div>
            <span>TanStack Query </span>
            <strong>Practice Lab</strong>
          </div>
        </div>

        <div className="progress-panel" aria-label="学习进度">
          <div className="progress-row">
            <span>完成进度</span>
            <strong>{completedPercent}%</strong>
          </div>
          <div className="progress" aria-hidden="true">
            <span style={{ width: `${completedPercent}%` }} />
          </div>
        </div>

        <label className="mobile-lesson-picker">
          <span>选择课程</span>
          <select value={selectedLessonId} onChange={(event) => onSelectLesson(event.target.value)}>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.number}. {lesson.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <nav className="course-list" aria-label="课程列表">
        {lessons.map((lesson) => {
          const isSelected = selectedLessonId === lesson.id
          const isDone = completedLessons.has(lesson.id)

          return (
            <button
              className={`course-item${isSelected ? ' selected' : ''}`}
              key={lesson.id}
              type="button"
              onClick={() => onSelectLesson(lesson.id)}
              onMouseEnter={() => onPrefetchLesson(lesson.id)}
              onFocus={() => onPrefetchLesson(lesson.id)}
            >
              <span className="course-number">{lesson.number}</span>
              <span className="course-meta">
                <span className="course-title">{lesson.title}</span>
                <span>{lesson.level}</span>
              </span>
              <span className={`course-check${isDone ? ' done' : ''}`} aria-hidden="true">
                {isDone ? '✓' : ''}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
