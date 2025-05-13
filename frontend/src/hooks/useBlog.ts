import React, { useState,useEffect } from 'react'
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
type Blog = {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
    };
    authorId: string;
  };
  

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