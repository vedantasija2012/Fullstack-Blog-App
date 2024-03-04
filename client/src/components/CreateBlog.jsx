import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index.js';

const CreateBlog = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(Context);
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState('')

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)

        const url = URL.createObjectURL(selectedFile)
        setFileUrl(url)
        console.log(url)
    }

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        try {
            // const formData = new FormData();
            // formData.append('title', title)
            // formData.append('description', description)
            // formData.append('file', file)

            // const { data } = await axios.post("http://localhost:5000/api/v1/new/blog", { formData }, { withCredentials: true })

            const { data } = await axios.post("http://localhost:5000/api/v1/new/blog", { title, description }, { withCredentials: true })

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

            setTitle("")
            setDescription("");
            // setFile(null)
            // setFileUrl('')
        } catch (error) {
            console.error(error)
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
        <>
            {
                isAuthenticated ? (<div className='my-4 p-6 w-full md:w-4/5 shadow-2xl block mx-auto'>
                    <h2 className='text-center text-xl font-bold my-2'>Create New Blog</h2>
                    <form action="/new/blog" method='post' className='flex flex-col items-center justify-center'>
                        <input type="title" onChange={(e) => setTitle(e.target.value)} value={title} required className='my-2 px-4 py-2 font-semibold rounded-md border-2 w-full md:w-1/3' name='title' placeholder='Enter Title:' />

                        <input type="file" id='file' onChange={handleFileChange} className='my-2 px-4 py-2 rounded-md border-2 font-semibold w-full md:w-1/3 hover:border-blue-500 hover:text-blue-500' name='file' placeholder='Select File:' />
                        {fileUrl && (
                            <p className="text-xs text-gray-600 mt-1"><strong>Preview:</strong> <a href={fileUrl} target="_blank" rel="noopener noreferrer">{file.name}</a></p>
                        )}

                        <textarea type="description" onChange={(e) => setDescription(e.target.value)} value={description} required id="description" cols="30" rows="3" className='my-2 px-4 py-2 rounded-md font-semibold border-2 w-full md:w-1/3' name='description' placeholder='Elaborate your blog:'></textarea>
                        <button onClick={handleCreateBlog} className="px-4 py-2 my-2 border-2 rounded-md border-blue-500 text-blue-500 font-bold hover:border-black hover:text-black hover:underline">Publish Blog</button>
                    </form>
                </div>) : (
                    <div className='block px-6 py-4 mx-auto my-6 rounded-md border-2 border-red-500 shadow-xl w-full md:w-1/3'>
                        <h2 className='text-red-500 font-bold text-center my-4'>Restricted Access!!</h2>
                        <p className='text-red-500 font-bold text-center my-4'>Please Login To Create Blogs...</p>
                    </div>
                )
            }
        </>
    )
}

export default CreateBlog