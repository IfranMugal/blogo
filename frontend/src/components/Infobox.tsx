import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { type signupInput } from 'blogo-common';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

function Infobox() {
  const navigate = useNavigate();
  const[errors,setError] = useState("");
  const [postInputs, setPostInputs] = useState<signupInput>({
    email: "",
    name: "",
    password: ""
  }); 
  const [showPassword, setShowPassword] = useState(false); // ✅ Restored state

  async function sendRequest(){
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
      console.log("response is : ",response)
      localStorage.setItem("jwt",response.data?.token)
      navigate("/blog")
      alert("signup end reached")
    } catch (error : any) {
      setError(error.response.data.error || error.response.data.message);
      console.log(error.response.data)
    }

  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">

        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
          className="text-center text-3xl font-extrabold text-blue-600"
        >
          Welcome to BLOGO
        </motion.div>

        <div className="text-center text-xl font-semibold text-gray-700">
          Create an account
        </div>

        <div className="text-sm text-gray-600 text-center">
          Already have an account?
          <Link to="/signin" className="text-blue-500 hover:underline ml-1">
            Sign in
          </Link>
        </div>

        <div className="space-y-2">
          <div className="text-gray-600 font-medium">Name</div>
          <input
            type="text"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value
              })
            }}
            placeholder="Name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="text-gray-600 font-medium">Email</div>
          <input
            type="email"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }}
            placeholder="e-mail"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="text-gray-600 font-medium">Password</div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // ✅ Uses state
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value
                })
              }}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              onClick={() => setShowPassword(!showPassword)} // ✅ Toggle logic
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          <div className='text-red-500'>{errors ? errors : null}</div>
        </div>

        <button onClick={sendRequest} className="w-full mt-4 bg-blue-500 hover:bg-red-500 text-white py-2 rounded transition duration-300">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Infobox;
