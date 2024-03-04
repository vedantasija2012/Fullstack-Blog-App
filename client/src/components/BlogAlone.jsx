import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Context } from '../index.js';

const BlogAlone = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true)
    const [userID, setUserID] = useState('')
    const { isAuthenticated } = useContext(Context);
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        try {
            if (!isAuthenticated) {
                return navigate('/login')
            }
            const { data } = await axios.delete(`http://localhost:5000/api/v1/delete/${id}`, { withCredentials: true })

            setBlog((prevBlogs) => prevBlogs.filter(blog => blog._id !== id))

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
            navigate('/blogs')
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

    const fetchUserID = async()=>{
        const {data} = await axios.get('http://localhost:5000/api/v1/profile', {withCredentials: true})
        setUserID(data.user._id)
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/v1/blog/${id}`)
                toast.success(`${data.message}`, {
                    position: "top-center",
                    autoClose: 100,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                });
                setBlog(data.blog)
                setLoading(false)
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
        fetchBlog()
        fetchUserID()
    }, [id])
    if (loading) {
        return <Loader />
    }
    return (
        <div className='my-2 block mx-auto w-full md:w-5/6 shadow-xl'>
            <div className="individual-blog px-8 py-2">
                <h3 className='my-2 text-2xl text-center font-bold underline'>{blog.title}</h3>
                <img className='my-2 w-full h-[65vh] object-cover rounded-md' src={blog.image} alt="Could Not Load!" />
                <p className='my-2 text-xl'>{blog.description}</p>
            </div>
            {
                userID===blog.author?
            <div className='px-2 py-4 flex justify-end items-center'>
                <span className='text-xs text-red-500 font-semibold'>23</span>
                <button className='ml-1 mr-2 text-red-600 font-bold text-xl' onClick={() => console.log("Clicked")}>
                    <AiOutlineHeart />
                </button>
                <button className='mx-2 text-red-600 font-bold text-xl'>
                    <Link to={`/update/${id}`}><AiOutlineEdit /></Link>
                </button>
                <button className='mx-2 text-red-600 font-bold text-xl' onClick={() => handleDelete(blog._id)}>
                    <AiOutlineDelete />
                </button>
            </div> : ''
            }
        </div>
    )
}

export default BlogAlone