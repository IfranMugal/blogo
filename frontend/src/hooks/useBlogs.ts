import { useState,useEffect } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 
import axios from 'axios';
export type Blog = {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
    };
    authorId: string;
  };
  

function useBlogs() {
    const[loading,setLoading] = useState(true);
    const[blogs,setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("jwt");

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: `Bearer ${token}` // replace with your actual token variable
            }
        }).then(response => {
            setLoading(false);
            setBlogs(response.data.blogs);
        })   
    },[])
    return {
        loading,
        blogs
    }
}

export default useBlogs