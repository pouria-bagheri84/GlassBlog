// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-8">
          <AlertCircle className="w-24 h-24 mx-auto text-purple-600 animate-bounce" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          404
        </h1>
        
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
          اوپس! صفحه‌ای که دنبالش بودی پیدا نشد.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition shadow-lg"
        >
          <Home className="w-5 h-5" />
          بازگشت به خانه
        </Link>
      </div>
    </div>
  )
}