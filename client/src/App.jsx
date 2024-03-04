import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import BlogAlone from './components/BlogAlone'
import BlogUpdate from './components/BlogUpdate'
import Profile from './components/Profile'
import MyBlogs from './components/MyBlogs.jsx'
import { Context } from './index.js'
import axios from 'axios'
import Footer from './components/Footer.jsx'

const App = () => {
  const {setIsAuthenticated} = useContext(Context);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/v1/profile', {withCredentials:true}).then(()=>{
      setIsAuthenticated(true)
    }).catch(()=>{
      setIsAuthenticated(false)
    })
  })
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/my-blogs' element={<MyBlogs />} />
        <Route path='/blog/:title/:id' element={<BlogAlone />} />
        <Route path='/update/:id' element={<BlogUpdate />} />
        <Route path='/new/blog' element={<CreateBlog />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App