import { lessons } from '../lessons'
import type { Lesson } from '../types/lesson'

export const completedStorageKey = 'tanstack-query-practice-lab.completed'
export const activeLessonStorageKey = 'tanstack-query-practice-lab.active-lesson'

export function getStoredCompleted() {
  try {
    return JSON.parse(localStorage.getItem(completedStorageKey) || '[]') as string[]
  } catch {
    return []
  }
}

export function getStoredLessonId() {
  try {
    const lessonId = localStorage.getItem(activeLessonStorageKey)
    return lessons.some((lesson) => lesson.id === lessonId) ? lessonId! : lessons[0].id
  } catch {
    return lessons[0].id
  }
}

export function fetchLesson(lessonId: string) {
  const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0]

  return new Promise<Lesson>((resolve) => {
    window.setTimeout(() => resolve(lesson), 260)
  })
}
