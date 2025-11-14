import { posts } from '../../data/posts'
import { Clock, Tag, TrendingUp, BookOpen } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'
import { useTheme } from '../../context/ThemeContext'

export default function Sidebar() {
  const recentPosts = posts.slice(0, 5)
  const popularTags = ['UI/UX', 'React', 'Tailwind', 'Design', 'Development', 'Glassmorphism']
  
  const { isDark } = useTheme()
  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* ویجت پست‌های اخیر */}
      <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-2xl p-6 backdrop-blur-md`}>
        <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
          <Clock className="w-5 h-5" />
          پست‌های اخیر
        </h3>
        <div className="space-y-3">
          {recentPosts.map(post => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className="flex items-center gap-3 p-3 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-colors group"
            >
              <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={post.image || `https://picsum.photos/64/48?random=${post.id}`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(post.date)} • {post.readTime}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ویجت تگ‌های محبوب */}
      <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-2xl p-6 backdrop-blur-md`}>
        <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
          <Tag className="w-5 h-5" />
          تگ‌های محبوب
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <a
              key={tag}
              href="#"
              className="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* ویجت آمار */}
      <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-2xl p-6 backdrop-blur-md`}>
        <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
          <TrendingUp className="w-5 h-5" />
          آمار
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">کل مقالات</span>
            <span className="font-bold">{posts.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">بازدید کل</span>
            <span className="font-bold">12.5k</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">نظرات</span>
            <span className="font-bold">245</span>
          </div>
        </div>
      </div>
    </aside>
  )
}