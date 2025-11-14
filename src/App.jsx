// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/post/:id" element={<Layout><Post /></Layout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App