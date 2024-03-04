import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const fetchTrendingBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/blogs', { withCredentials: false })
      setTrendingBlogs(data.blogs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrendingBlogs()
  }, [])
  return (
    <div>
      <div className='flex justify-center items-center my-4 px-2'>
        <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search Blogs' className='px-4 py-2 rounded-md border-2 border-gray-200 font-semibold hover:border-blue-500 w-full md:w-1/3' />
        <button className='py-2 px-4 mx-2 font-semibold border-2 rounded-md text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:underline'>Search</button>
      </div>
      <h1 className='text-center text-2xl font-bold mt-4'>Our Trending Blogs</h1>
      <div className='flex flex-wrap justify-center px-4'>
        {
          trendingBlogs.slice(0, 5).map((element, index) => {
            return (
              <div className='w-full md:w-1/3'>
                <BlogCard key={index} image={element.image} title={element.title} description={element.description} blogID={element._id} isOwner={false} username={'Miscelleneous'} createdAt={element.dateCreated} />
              </div>
            )
          })
        }
      </div>
      <div className='my-4'>
        <div className='block mx-auto px-4 py-6 w-full md:w-11/12 shadow-lg rounded-sm bg-blue-400 text-white'>
          <h2 className='text-center text-xl font-bold mb-2'>Publish your choice</h2>
          <p className='text-lg mb-2'>Effortlessly craft an aesthetically pleasing blog and track user engagement by monitoring the blog's like count. Create a beautiful blog with ease and monitor whether people are liking the blog or not by checking the like count of the blog.</p>
        </div>
        <div className='block mx-auto px-4 py-6 w-full md:w-11/12 shadow-lg rounded-sm bg-red-400 text-white'>
          <h2 className='text-center text-xl font-bold mb-2'>Join millions of others</h2>
          <p className='text-lg mb-2'>Whether you're sharing your expertise, breaking news, or simply expressing your thoughts, you're in good company on Blogger. Signup/Login to explore why millions of individuals have chosen to share their passions here.</p>
          <button onClick={() => navigate('/login')} className='block mx-auto mt-4 px-6 py-2 font-bold rounded-sm border-2 hover:border-black hover:text-black border-white text-white hover:underline'>Create Blog</button>
        </div>
        <div className='block mx-auto px-4 py-6 w-full md:w-11/12 shadow-lg rounded-sm bg-green-400 text-white'>
          <h2 className='text-center text-xl font-bold mb-2'>How to create a blog?</h2>
          <ol type='1' className='mx-6 font-semibold'>
            <li className='list-decimal'>Login or Signup</li>
            <li className='list-decimal'>Navigate to Blogs page</li>
            <li className='list-decimal'>Click on Create Blog button</li>
            <li className='list-decimal'>Fill the respective input fields.</li>
            <li className='list-decimal'>You are now set to create blogs.</li>
          </ol>
          <p className='text-lg my-2'>Creating a blog is a simple 5-step process just follow above steps to create your own blog.</p>
        </div>
      </div>
    </div>
  )
}

export default Home