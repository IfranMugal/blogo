import React, { useEffect } from 'react'
import Appbar from '../components/Appbar';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import BlogComponent from '../components/BlogComponent';

function BlogwithId() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt") || null
  useEffect(() => {
    if(token === null){
      navigate("/signin")
    }
  },[])
  const { loading, blog } = useBlog();
  if(loading){
    return <div>loading...</div>
  }
  
  return (
    <>
    <Appbar myblog={true} bulk={false} create={false}/>
    <div className='flex justify-center'>
      <div className=''>
          <BlogComponent 
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate="30-february-2025" // optionally dynamic
          />
      </div>
    </div>
    </>
  )
}

export default BlogwithId