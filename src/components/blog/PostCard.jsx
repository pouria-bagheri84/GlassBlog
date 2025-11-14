import { motion } from 'framer-motion'
import { Clock, User, Tag, Eye, Heart } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function PostCard({ post, index }) {
const { isDark } = useTheme() 
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`group overflow-hidden ${isDark ? 'glass-dark' : 'glass'} border-0`}
    >
      <Link to={`/post/${post.id}`} className="block">
        {/* تصویر پست */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={('../'+post.image) || `https://picsum.photos/800/400?random=${post.id}`} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* برچسب ویژه */}
          {post.featured && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
              ویژه
            </span>
          )}
        </div>

        {/* محتوای پست */}
        <div className="p-6">
          {/* اطلاعات پست */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views || '1.2k'}
            </span>
          </div>

          {/* عنوان */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
            {post.title}
          </h3>

          {/* خلاصه */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          {/* تگ‌ها */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="flex items-center gap-1 text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* دکمه خواندن بیشتر */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 text-sm transition-colors">
              خواندن کامل
              <Heart className="w-4 h-4 group-hover:fill-current" fill="none" strokeWidth={2} />
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}