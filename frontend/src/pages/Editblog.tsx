import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Appbar from '../components/Appbar';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 
import axios from 'axios';

interface BlogData {
  title: string;
  content: string;
}

function Editblog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogData>({ title: '', content: '' });
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    // Fetch existing blog data
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { title, content } = response.data.blog;
        setBlog({ title, content });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    if (id) fetchBlog();
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id: id,title: blog.title, content: blog.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/userblog');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar bulk={false} create={false} myblog={true} />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Blog Post</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          rows={10}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Editblog;
