import { useParams } from 'react-router-dom'
import { posts } from '../../data/posts'
import { formatDate } from '../../utils/formatDate'
import { ArrowLeft, Clock, User, Share2, Heart } from 'lucide-react'
import RelatedPosts from './RelatedPosts'
import CommentSection from './CommentSection'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function PostDetail() {
  const { id } = useParams()
  const post = posts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className={`${isDark ? 'glass-dark' : 'glass'} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">پست یافت نشد!</h1>
          <Link to="/blog" className="text-purple-600 hover:underline">← بازگشت به بلاگ</Link>
        </div>
      </div>
    )
  }

  // پست‌های مرتبط (بر اساس تگ)
  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)

  const { isDark } = useTheme()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* دکمه بازگشت */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <a 
            href="/blog" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            بازگشت به بلاگ
          </a>
        </motion.div>

        {/* هدر پست */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 ${isDark ? 'glass-dark' : 'glass'} rounded-2xl overflow-hidden`}
        >
          {/* تصویر */}
          {post.image && (
            <img 
              src={('../'+post.image) || `https://picsum.photos/1200/600?random=${post.id}`}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}

          {/* محتوا */}
          <div className="p-8">
            {/* اطلاعات */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  {post.likes || '12'}
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  اشتراک
                </button>
              </div>
            </div>

            {/* عنوان */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* محتوای کامل */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{post.content || `این محتوای کامل پست است. در پروژه واقعی، محتوای کامل و غنی اینجا قرار می‌گیرد.`}</p>
                
                <h2 className="text-2xl font-bold mt-12 mb-6">بخش اول: مقدمه</h2>
                <p className="mb-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                
                <img 
                  src={`https://picsum.photos/800/400?random=${post.id + 1}`}
                  alt="تصویر مرتبط"
                  className="w-full h-64 object-cover rounded-xl my-6"
                />
                
                <h2 className="text-2xl font-bold mt-12 mb-6">بخش دوم: جزئیات</h2>
                <p className="mb-6">این متن به عنوان نمونه استفاده شده و در پروژه واقعی، محتوای اصلی و تخصصی اینجا قرار می‌گیرد.</p>
                
                <blockquote className="border-r-4 border-purple-600 pr-4 italic text-gray-700 dark:text-gray-300 my-6">
                  "طراحی مدرن، تجربه کاربری را متحول می‌کند"
                </blockquote>
                
                <p className="mb-6">پایان مقاله. امیدواریم از مطالعه لذت برده باشید!</p>
              </div>
            </div>

            {/* تگ‌ها */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">تگ‌ها:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* پست‌های مرتبط */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
        )}

        {/* کامنت‌ها */}
        <CommentSection postId={post.id} />
      </div>
    </div>
  )
}