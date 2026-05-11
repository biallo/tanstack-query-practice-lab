export type Lesson = {
  id: string
  number: string
  title: string
  level: string
  summary: string
  concepts: Array<{ title: string; detail: string }>
  example: {
    title: string
    language: string
    code: string
  }
  review: Array<{ question: string; answer: string }>
}

export type LessonTab = 'explain' | 'review'
