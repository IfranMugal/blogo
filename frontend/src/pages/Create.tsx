import { useEffect, useState } from 'react';
import Appbar from '../components/Appbar';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('jwt') || null;

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, []);

  async function post() {
    if (!title.trim() || !description.trim()) {
      setError('Title or content cannot be empty.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Post created:', response.data);

      setTimeout(() => {
        navigate('/blog');
      }, 2000);
    } catch (error) {
      console.error('Error posting blog:', error);
      setLoading(false);
      setError('Failed to post. Please try again.');
    }
  }

  async function generateBlog() {
    if (!title.trim()) {
      setError('Please provide a title to AI');
      return;
    }

    setError('');
    setGenerating(true);

    try {
      const response = await axios.post(`https://blogo-llm-api.onrender.com/generate`, {
        topic: title,
      });

      const result = response.data.result;
      console.log('Result:', result);

      if (result.toLowerCase().includes('invalid')) {
        setError('Invalid blog topic');
        setGenerating(false);
        return;
      }

      setDescription(result); // Set the generated content
    } catch (err) {
      console.error('Error generating blog:', err);
      setError('Failed to generate blog. Please try again.');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <Appbar myblog={true} bulk={false} create={true} />
      <div className="flex flex-col items-center min-h-screen px-4 mt-10">
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        {loading ? (
          <div className="text-lg text-gray-700 font-medium">Posting your blog... Please wait.</div>
        ) : (
          <>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
              className="w-full max-w-2xl mb-4 text-gray-600 placeholder-gray-400 text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-300"
            />

            <div className="w-full max-w-2xl mb-4 border border-gray-200 rounded-lg">
              <div className="px-4 py-2 rounded-b-lg">
                <label htmlFor="editor" className="sr-only">
                  Publish post
                </label>
                <textarea
                  id="editor"
                  rows={generating ? 5 : 10}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="block w-full px-0 text-lg text-gray-600 placeholder-gray-400 bg-transparent border-0 focus:ring-0 focus:border-transparent"
                  placeholder="Write an article or Give the title and let AI do the rest..."
                  required
                  disabled={generating}
                ></textarea>

                {generating && (
                  <div className="mt-2 text-blue-600 text-sm font-medium animate-pulse">
                    Generating blog using AI...
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center w-full px-4 mt-4 gap-4">
  {/* Publish Post button - top */}
  <button
    onClick={post}
    className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:opacity-50"
    disabled={loading || generating}
  >
    Publish Post
  </button>

  {/* Generate with AI button - below Publish */}
  <button
    onClick={generateBlog}
    className="group relative flex items-center justify-start gap-2 overflow-hidden transition-all duration-1000 ease-in-out bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-4 py-4 w-13 hover:w-50 disabled:opacity-50"
    disabled={generating}
  >
    <span className="min-w-[20px] flex items-center justify-center">
      <BrainCircuit className="w-5 h-5 shrink-0" />
    </span>
    <span className="absolute left-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap">
      Generate with AI
    </span>
  </button>
</div>

          </>
        )}
      </div>
    </>
  );
}

export default Create;
