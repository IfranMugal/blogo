import React from 'react'
import { Link } from 'react-router-dom'

interface Blogcardprops{
    id: string
    authorName : string,
    title : string,
    content : string,
    publishedDate : string
}
function Blogcard({id,authorName,title,content,publishedDate} : Blogcardprops) {
  return (
    <Link to={`/blog/${id}`} >
    <div className='text-left w-lg p-6 border-b border-gray-300 cursor-pointer'>
        <div className='flex'>
            <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-md ">
                {authorName.charAt(0).toUpperCase()}
            </div>
            <div className='text-sm text-gray-500 px-2 mt-1'>
                {authorName} . {publishedDate}
            </div>
        </div>
        <div className='text-black text-xl font-semibold mt-1 mb-2'>
            {title}
        </div>
        <div className='text-sm text-gray-500'>
            {content.length > 50 ? content.slice(0,50) + "..." : content+"..."}
        </div>
        <div className='flex justify-between mt-6'>
            <div className=' text-xs text-gray-400'>
                {Math.ceil(content.length / 100)} minutes read
            </div>
            <div className='text-xs text-gray-400'>space for blog edit and other options</div>
        </div>
    </div>
    </Link>
  )
}

export default Blogcard