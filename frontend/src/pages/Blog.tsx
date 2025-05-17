import React, { useEffect } from 'react'
import Blogcard from '../components/Blogcard'
import useBlogs from '../hooks/useBlogs';
import Appbar from '../components/Appbar';
import { useNavigate } from 'react-router-dom';
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
      <Appbar myblog={false} bulk={true} create={false}/>
      <div className='flex flex-col items-center justify-center'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  }
  
  return (
    <>
    <Appbar myblog={false} bulk={true} create={false}/>
    <div className='flex justify-center'>
      <div >
        {blogs.map(blog => (
          <Blogcard 
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={
              new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }).replace(/ /g, '-')
            }
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default Blog