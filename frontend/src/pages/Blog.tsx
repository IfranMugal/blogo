import React, { useEffect } from 'react'
import Blogcard from '../components/Blogcard'
import useBlogs from '../hooks/useBlogs';
import Appbar from '../components/Appbar';
import { useNavigate } from 'react-router-dom';

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
    return <div>loading...</div>
  }
  
  return (
    <>
    <Appbar bulk={true} create={false}/>
    <div className='flex justify-center'>
      <div >
        {blogs.map(blog => (
          <Blogcard 
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate="30-february-2025" // optionally dynamic
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default Blog