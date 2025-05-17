import React, { useEffect } from 'react'
import Blogcard from '../components/Blogcard'
import useBlogs from '../hooks/userBlog';
import Appbar from '../components/Appbar';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react'; 
import Skeleton from '../components/Skeleton';

function Blog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt") || null
  useEffect(() => {
    if(token === null){
      navigate("/signin")
    }
  },[])

  const {loading,blogs} = useBlogs();
  if(loading){
    return <>
    <Appbar myblog={true} bulk={false} create={false}/>
    <div className='flex flex-col items-center justify-center'>
      <Skeleton />
      <Skeleton />
    </div>
    </>
  }

  if (blogs.length === 0) {
    return (<>
      <Appbar myblog={true} bulk={false} create={false}/>
      <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600 bg-gray-50 rounded-2xl shadow-md p-6">
        <FileText className="w-12 h-12 text-gray-400 mb-3" />
        <h2 className="text-xl font-semibold">No Blog Posts Yet</h2>
        <p className="text-sm text-gray-500 mt-1">Start writing to share your thoughts with the world.</p>
      </div>
      </>
    );
  }
  
  
  return (
    <>
    <Appbar myblog={true} bulk={false} create={false}/>
    <div className='flex justify-center'>
      <div >
        {blogs.map(blog => (
          <Blogcard 
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate="30-february-2025"
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default Blog