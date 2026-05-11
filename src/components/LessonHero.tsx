import type { Lesson } from '../types/lesson'

type LessonHeroProps = {
  lesson: Lesson
  completed: boolean
}

export function LessonHero({ lesson, completed }: LessonHeroProps) {
  return (
    <section className="lesson-hero">
      <div>
        <p className="eyebrow">Lesson {lesson.number}</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
      </div>
      <span className={completed ? 'status-pill done' : 'status-pill'}>
        {completed ? '已完成' : lesson.level}
      </span>
    </section>
  )
}
