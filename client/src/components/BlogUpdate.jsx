import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogUpdate = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const handleUpdate = async(e)=>{
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:5000/api/v1/update/${id}`, {title, description}, {withCredentials:true})
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

    useEffect(() => {
        const fetchBlog = async () => {
            const {data} = await axios.get(`http://localhost:5000/api/v1/blog/${id}`, {withCredentials:true})
            console.log(data)
            setTitle(data.blog.title)
            setDescription(data.blog.description)
        }
        fetchBlog()
    }, [id])
    return (
        <div className='my-4 p-6 w-full md:w-4/5 shadow-2xl block mx-auto'>
            <h2 className='text-center text-xl font-bold my-2'>Edit Blog</h2>
            <form action="/update/:id" method='post' className='flex flex-col items-center justify-center'>
                <input type="title" onChange={(e) => setTitle(e.target.value)} value={title} required className='my-2 px-4 py-2 font-semibold rounded-md border-2 w-full md:w-1/3' name='title' placeholder='Enter Title:' />
                <textarea type="description" onChange={(e) => setDescription(e.target.value)} value={description} required id="description" cols="30" rows="5" className='my-2 px-4 py-2 rounded-md font-semibold border-2 w-full md:w-1/3' name='description' placeholder='Elaborate your blog:'></textarea>
                <p className="text-xs text-gray-600 mt-1"><strong>Note:</strong> Delete Blog to Change Image</p>
                <button onClick={handleUpdate} className="px-4 py-2 my-2 border-2 rounded-md border-red-500 text-red-500 font-bold hover:underline">Update Blog</button>
            </form>
        </div>
    )
}

export default BlogUpdate