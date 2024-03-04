import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from './BlogCard';
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState([])
    const [username, setUserName] = useState('')

    const fetchMyBlogs = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/my-blogs', { withCredentials: true })
        console.log(data)
        setMyBlogs(data.blogs)
    }

    const fetchUserName = async()=>{
        const {data} = await axios.get('http://localhost:5000/api/v1/profile', {withCredentials: true})
        setUserName(data.user.name)
    }
    useEffect(() => {
        fetchMyBlogs()
        fetchUserName()
    }, [])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/delete/${id}`, { withCredentials: true })

            setMyBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id))

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
            <h1 className='font-bold underline text-2xl my-2'>My Blogs</h1>
            {
                (myBlogs.length !== 0) ? myBlogs.map((blog, index) => {
                    return (
                        <BlogCard key={index} image={blog.image} title={blog.title} description={blog.description} blogID={blog._id} isOwner={true} onDelete={() => handleDelete(blog._id)} username={username||'Miscelleneous'} createdAt={blog.dateCreated} />
                    )
                }) : <h2 className='text-center text-2xl font-bold'>You Have Not Created Blogs Yet.</h2>
            }
        </div>
    )
}

export default MyBlogs