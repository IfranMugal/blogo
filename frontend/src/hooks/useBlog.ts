import { useState,useEffect } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import type { Blog } from './useBlogs';

function useBlog() {
    const[loading,setLoading] = useState(true);
    const[blog,setBlog] = useState<Blog>({
        id: "",
        title: "",
        content: "",
        author: {
          name: ""
        },
        authorId: ""
      })
    const token = localStorage.getItem("jwt");
    const {id} = useParams<{id : string}>();

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${token}` // replace with your actual token variable
            }
        }).then(response => {
            //console.log(response.data.blog);
            setLoading(false);
            setBlog(response.data.blog);
        })   
    },[])
    return {
        loading,
        blog
    }
}

export default useBlog