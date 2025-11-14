import { useState } from 'react'
import { User, Heart, Reply, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDate } from '../../utils/formatDate'
import { useTheme } from '../../context/ThemeContext'

// داده‌های نمونه کامنت
const sampleComments = [
  {
    id: 1,
    author: 'سارا احمدی',
    avatar: 'https://picsum.photos/40/40?random=1',
    content: 'مقاله فوق‌العاده‌ای بود! واقعاً از توضیحات لذت بردم.',
    date: '2025-03-10',
    likes: 5,
    replies: [
      {
        id: 1.1,
        author: 'علی رضایی',
        avatar: 'https://picsum.photos/40/40?random=2',
        content: 'کاملاً موافقم! بخش Glassmorphism خیلی کاربردی بود.',
        date: '2025-03-10',
        likes: 2
      }
    ]
  },
  {
    id: 2,
    author: 'محمد حسینی',
    avatar: 'https://picsum.photos/40/40?random=3',
    content: 'ممنون از مقاله. فقط یک سوال: آیا برای موبایل هم بهینه‌سازی شده؟',
    date: '2025-03-11',
    likes: 3,
    replies: []
  }
]

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState(sampleComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      author: 'کاربر مهمان',
      avatar: 'https://picsum.photos/40/40?random=4',
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: []
    }

    if (replyingTo) {
      // اضافه کردن به replies
      setComments(comments.map(c => 
        c.id === replyingTo.commentId 
          ? { ...c, replies: [...c.replies, { ...comment, id: `${replyingTo.commentId}.${c.replies.length + 1}` }] }
          : c
      ))
      setReplyingTo(null)
    } else {
      // اضافه کردن کامنت جدید
      setComments([comment, ...comments])
    }

    setNewComment('')
  }

  const toggleLike = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ))
  }

  const { isDark } = useTheme()

  return (
    <div className="mt-16">
      <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-2xl p-6 backdrop-blur-md`}>
        <h2 className="text-2xl font-bold mb-6">نظرات ({comments.length})</h2>

        {/* فرم ارسال کامنت */}
        <form onSubmit={handleSubmitComment} className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex gap-4 mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? `پاسخ به ${replyingTo.author}...` : 'نظر خود را بنویسید...'}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/10 dark:bg-gray-900/50 focus:outline-none focus:border-purple-500 resize-none"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3">
            {replyingTo && (
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                انصراف
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              ارسال نظر
            </button>
          </div>
        </form>

        {/* لیست کامنت‌ها */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex gap-4">
                <img 
                  src={comment.avatar} 
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                      <span className="text-sm text-gray-500 ml-2">• {formatDate(comment.date)}</span>
                    </div>
                    <button
                      onClick={() => setReplyingTo({ author: comment.author, commentId: comment.id })}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      پاسخ
                    </button>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {comment.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" fill={comment.likes > 0 ? 'currentColor' : 'none'} />
                      {comment.likes}
                    </button>
                    <span className="text-gray-500">مفید بود</span>
                  </div>
                </div>
              </div>

              {/* replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-14 mt-4 space-y-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <img 
                        src={reply.avatar} 
                        alt={reply.author}
                        className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
                      />
                      <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {reply.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(reply.date)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}