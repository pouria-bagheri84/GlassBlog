import { Search, Filter, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function SearchFilter({ searchTerm, selectedCategory, categories, onFilter }) {
  const [localSearch, setLocalSearch] = useState(searchTerm)
  const [showFilters, setShowFilters] = useState(false)
  const { isDark } = useTheme()

  // همگام‌سازی با props
  useEffect(() => {
    setLocalSearch(searchTerm)
  }, [searchTerm])

  const handleSearch = (e) => {
    const term = e.target.value
    setLocalSearch(term)
    
    // دیبونس (تاخیر 300ms)
    clearTimeout(window.searchTimeout)
    window.searchTimeout = setTimeout(() => {
      onFilter(term, selectedCategory)
    }, 300)
  }

  const clearSearch = () => {
    setLocalSearch('')
    onFilter('', selectedCategory)
  }

  const handleCategoryChange = (category) => {
    onFilter(localSearch, category)
  }

  return (
    <div className={`${isDark ? 'glass-dark' : 'glass'} rounded-2xl p-4 mb-8 backdrop-blur-md`}>
      {/* جستجو */}
      <div className="relative mb-4">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={localSearch}
          onChange={handleSearch}
          placeholder="جستجو در مقالات..."
          className={`${isDark ? 'glass-dark' : 'glass'} w-full pr-12 pl-4 py-3  border border-white/20 rounded-xl placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors`}
        />
        {localSearch && (
          <button
            onClick={clearSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* فیلتر دسته‌بندی */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Filter className="w-5 h-5" />
          فیلتر دسته‌بندی
        </button>

        {showFilters && (
          <div className="absolute top-full right-0 mt-2 bg-white/10 dark:bg-gray-900/50 backdrop-blur-md rounded-xl p-4 w-64 shadow-2xl border border-white/20 z-10">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-right py-2 px-3 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}