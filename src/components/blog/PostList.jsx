import { useState } from 'react'
import PostCard from './PostCard'
import SearchFilter from './SearchFilter'
import { posts } from '../../data/posts'
import { useTheme } from '../../context/ThemeContext'

export default function PostList() {
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('همه')
  const { isDark } = useTheme()
  // فیلتر کردن پست‌ها
  const handleFilter = (term = '', category = 'همه') => {
    setSearchTerm(term)
    setSelectedCategory(category)
    
    let filtered = posts
    
    if (term) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      )
    }
    
    if (category !== 'همه') {
      filtered = filtered.filter(post => post.category === category)
    }
    
    setFilteredPosts(filtered)
  }

  const categories = ['همه', ...new Set(posts.map(post => post.category))]

  return (
    <div className={`${isDark ? 'glass-dark' : 'glass'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            بلاگ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            آخرین مطالب و مقالات در حوزه طراحی، توسعه و فناوری
          </p>
        </div>

        {/* فیلتر و جستجو */}
        <SearchFilter 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onFilter={handleFilter}
        />

        {/* نمایش تعداد نتایج */}
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'مقاله' : 'مقالات'} یافت شد
          </p>
        </div>

        {/* گرید پست‌ها */}
        <div className={`grid gap-8 ${filteredPosts.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className={`${isDark ? 'glass-dark' : 'glass'} p-8 rounded-2xl max-w-md mx-auto`}>
                <h3 className="text-2xl font-bold mb-4">هیچ پستی یافت نشد</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  با کلمات کلیدی متفاوت جستجو کنید
                </p>
                <button 
                  onClick={() => handleFilter('')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                  پاک کردن فیلتر
                </button>
              </div>
            </div>
          )}
        </div>

        {/* لودینگ (اگر بخوای) */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-medium">
              مشاهده مقالات بیشتر
            </button>
          </div>
        )}
      </div>
    </div>
  )
}