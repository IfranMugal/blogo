import React, { useState,useEffect } from 'react'
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import type {Blog} from './useBlogs'
  

function useBlogs() {
    const[loading,setLoading] = useState(true);
    const[blogs,setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("jwt");

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/userbulk`,{
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