import type { LessonTab } from '../types/lesson'

type LessonTabsProps = {
  activeTab: LessonTab
  onTabChange: (tab: LessonTab) => void
}

export function LessonTabs({ activeTab, onTabChange }: LessonTabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="课程内容">
      <button
        className={activeTab === 'explain' ? 'active' : ''}
        type="button"
        role="tab"
        aria-selected={activeTab === 'explain'}
        onClick={() => onTabChange('explain')}
      >
        讲解
      </button>
      <button
        className={activeTab === 'review' ? 'active' : ''}
        type="button"
        role="tab"
        aria-selected={activeTab === 'review'}
        onClick={() => onTabChange('review')}
      >
        复盘
      </button>
    </div>
  )
}
