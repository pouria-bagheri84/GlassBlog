import { motion } from 'framer-motion'
import PostCard from './PostCard'
import { useTheme } from '../../context/ThemeContext'

export default function RelatedPosts({ posts, currentPostId }) {
const { isDark } = useTheme()

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-20"
    >
      <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-2xl p-6 mb-8 backdrop-blur-md`}>
        <h2 className="text-2xl font-bold mb-6">مطالب مرتبط</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          ممکن است این مقالات هم برایتان جالب باشد
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <PostCard post={post} index={index} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}