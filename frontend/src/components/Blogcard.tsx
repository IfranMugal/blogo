
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface BlogcardProps {
  id: string
  authorName: string
  title: string
  content: string
  publishedDate: string
}

function Blogcard({ id, authorName, title, content, publishedDate }: BlogcardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isUserBlog = location.pathname === '/userblog'
  const previewText = content.length > 50 ? content.slice(0, 50) + '...' : content + '...'
  const readTime = Math.ceil(content.length / 100)

  const handleEdit = () => {
    navigate(`edit/${id}`)
  }

  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="text-left w-sm border-b border-gray-300 cursor-pointer md:w-lg p-6">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-md">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm text-gray-500 px-2 mt-1">
            {authorName} · {publishedDate}
          </div>
        </div>
        <div className="text-black text-xl font-semibold mt-1 mb-2">
          {title}
        </div>
        <div className="text-sm text-gray-500">
          {previewText}
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-xs text-gray-400">
            {readTime} minutes read
          </div>
          {isUserBlog && (
            <button
              onClick={(e) => { e.preventDefault(); handleEdit() }}
              className="text-blue-500 hover:underline text-xs"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Blogcard