import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogCard from './BlogCard'
import axios from 'axios';
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../index.js';

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [userID, setUserID] = useState('')
  const { isAuthenticated } = useContext(Context)
  const navigate = useNavigate()
  const fetchBlogs = async () => {
    try {
      if (!isAuthenticated) {
        return navigate('/login')
      }
      const { data } = await axios.get('http://localhost:5000/api/v1/blogs');
      setBlogs(data.blogs)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserID = async () => {
    if (!isAuthenticated) {
      return navigate('/login')
    }
    const { data } = await axios.get('http://localhost:5000/api/v1/profile', { withCredentials: true })
    setUserID(data.user._id)
  }

  useEffect(() => {
    fetchBlogs()
    fetchUserID()
  }, [])

  const handleDelete = async (id) => {
    try {
      if (!isAuthenticated) {
        navigate('/login')
      }
      const { data } = await axios.delete(`http://localhost:5000/api/v1/delete/${id}`, { withCredentials: true })

      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id))

      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  }

  return (
    <div className='m-2 flex justify-center items-center flex-col'>
      <div className='justify-self-start place-items-start'>
        <button className='border-2 font-bold text-gray-400 px-4 py-2 my-2 rounded-md hover:border-green-500 hover:text-green-500'>
          <Link to={'/new/blog'}>+ Create Blog</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          blogs.map((item, index) => {
            return (
              <BlogCard key={index} image={item.image} title={item.title} description={item.description}
                blogID={item._id} isOwner={userID === item.author} onDelete={() => handleDelete(item._id)} username={item.author || 'Miscelleneous'} createdAt={item.dateCreated} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Blogs