import PostCard from '../components/blog/PostCard';
import { posts } from '../data/posts';

export default function Home() {
  const featured = posts.find(p => p.featured);
  const recent = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {featured && (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 opacity-90" />
          <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-600">
              ProBlog
            </h1>
            <p className="text-xl mb-8">{featured.excerpt}</p>
            <a href={`/post/${featured.id}`} className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:scale-105 transition">
              مطالعه بیشتر
            </a>
          </div>
        </section>
      )}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">آخرین مطالب</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recent.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>
    </div>
  );
}