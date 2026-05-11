import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LessonHero } from './components/LessonHero'
import { LessonPanel } from './components/LessonPanel'
import { LessonTabs } from './components/LessonTabs'
import { Sidebar } from './components/Sidebar'
import { lessons } from './lessons'
import {
  activeLessonStorageKey,
  completedStorageKey,
  fetchLesson,
  getStoredCompleted,
  getStoredLessonId,
} from './services/lesson-service'
import type { LessonTab } from './types/lesson'
import './App.css'

function App() {
  const queryClient = useQueryClient()
  const [selectedLessonId, setSelectedLessonId] = useState(getStoredLessonId)
  const [activeTab, setActiveTab] = useState<LessonTab>('explain')
  const [completedLessons, setCompletedLessons] = useState(() => new Set(getStoredCompleted()))

  const lessonQuery = useQuery({
    queryKey: ['lesson', selectedLessonId],
    queryFn: () => fetchLesson(selectedLessonId),
    staleTime: 5 * 60_000,
  })

  const selectedLesson =
    lessonQuery.data ?? lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0]
  const selectedLessonCompleted = completedLessons.has(selectedLesson.id)
  const completedPercent = Math.round((completedLessons.size / lessons.length) * 100)

  function selectLesson(lessonId: string) {
    setSelectedLessonId(lessonId)
    setActiveTab('explain')
    localStorage.setItem(activeLessonStorageKey, lessonId)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function prefetchLesson(lessonId: string) {
    queryClient.prefetchQuery({
      queryKey: ['lesson', lessonId],
      queryFn: () => fetchLesson(lessonId),
      staleTime: 5 * 60_000,
    })
  }

  function completeLesson() {
    setCompletedLessons((current) => {
      const next = new Set(current)
      next.add(selectedLesson.id)
      localStorage.setItem(completedStorageKey, JSON.stringify([...next]))
      return next
    })
  }

  return (
    <div className="shell">
      <Sidebar
        completedLessons={completedLessons}
        completedPercent={completedPercent}
        lessons={lessons}
        onPrefetchLesson={prefetchLesson}
        onSelectLesson={selectLesson}
        selectedLessonId={selectedLessonId}
      />

      <main className="content">
        <LessonHero completed={selectedLessonCompleted} lesson={selectedLesson} />
        <LessonTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <LessonPanel
          activeTab={activeTab}
          completed={selectedLessonCompleted}
          lesson={selectedLesson}
          onCompleteLesson={completeLesson}
        />
      </main>
    </div>
  )
}

export default App
