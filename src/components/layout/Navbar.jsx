// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { Search, Menu, X, Sun, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'glass-dark' : 'glass'} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GlassBlog
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-purple-600 transition">خانه</Link>
            <Link to="/blog" className="hover:text-purple-600 transition">بلاگ</Link>
            <Link to="/about" className="hover:text-purple-600 transition">درباره</Link>
            
            {/* دکمه تم با انیمیشن فوری */}
            <button 
              onClick={toggleTheme}
              className="relative p-3 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300 overflow-hidden"
            >
              <Sun className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-500 ${isDark ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-500 ${isDark ? 'rotate-0 scale-100' : '-rotate-180 scale-0'}`} />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/20 mt-2">
            <Link to="/" className="block py-2">خانه</Link>
            <Link to="/blog" className="block py-2">بلاگ</Link>
            <Link to="/about" className="block py-2">درباره</Link>
          </div>
        )}
      </div>
    </nav>
  )
}