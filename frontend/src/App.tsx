import { BrowserRouter , Routes , Route } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blog from "./pages/Blog"
import BlogwithId from "./pages/BlogwithId"
import Create from "./pages/Create"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/blog/:id" element={<BlogwithId />}/>
          <Route path="/create" element={<Create />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
