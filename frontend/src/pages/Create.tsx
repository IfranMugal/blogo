import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem("jwt") || null;

    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, []);

    async function post() {
        // Validation
        if (!title.trim() || !description.trim()) {
            setError("Title or content cannot be empty.");
            return;
        }

        setError("");      // Clear previous error
        setLoading(true);  // Start loading

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content: description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Post created:", response.data);

            // Delay navigation with loading message
            setTimeout(() => {
                navigate("/blog");
            }, 2000);
        } catch (error) {
            console.error("Error posting blog:", error);
            setLoading(false);
            setError("Failed to post. Please try again.");
        }
    }

    return (
        <>
            <Appbar myblog={true} bulk={false} create={true} />
            <div className="flex flex-col items-center min-h-screen px-4 mt-10">
                {error && (
                    <div className="mb-4 text-red-600 text-sm">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="text-lg text-gray-700 font-medium">Posting your blog... Please wait.</div>
                ) : (
                    <>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full max-w-2xl mb-4 text-gray-600 placeholder-gray-400 text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-300"
                        />

                        <div className="w-full max-w-2xl mb-4 border border-gray-200 rounded-lg">
                            <div className="px-4 py-2 rounded-b-lg">
                                <label htmlFor="editor" className="sr-only">Publish post</label>
                                <textarea
                                    id="editor"
                                    rows={10}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="block w-full px-0 text-lg text-gray-600 placeholder-gray-400 bg-transparent border-0 focus:ring-0 focus:border-transparent"
                                    placeholder="Write an article..."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <button
                            onClick={post}
                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Publish post
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default Create;
