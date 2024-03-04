import React, { useState } from 'react'
import axios from 'axios'
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [query, setQuery] = useState("")

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/contact', { name, email, query }, { withCredentials: true })

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
      
      setName("")
      setEmail("")
      setQuery("")
    } catch (error) {
      toast.error(`Sending Message Failed`, {
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
    <div className='my-4 p-6 w-full md:w-4/5 shadow-2xl block mx-auto'>
      <h2 className='text-center text-xl font-bold my-2'>Feel Free To ask Anything</h2>
      <form action="/contact" method='post' className='flex flex-col items-center justify-center'>
        <input type="name" onChange={(e) => setName(e.target.value)} value={name} required className='my-2 px-4 py-2 rounded-md border-2 w-full md:w-1/3' name='name' placeholder='Enter Name:' />
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required className='my-2 px-4 py-2 rounded-md border-2 w-full md:w-1/3' name='email' placeholder='Enter Email:' />
        <textarea type="password" onChange={(e) => setQuery(e.target.value)} value={query} required id="query" cols="30" rows="3" className='my-2 px-4 py-2 rounded-md border-2 w-full md:w-1/3' name='password' placeholder='Describe Query:'></textarea>
        <button onClick={handleClick} className="px-4 py-2 my-2 border-2 rounded-md border-red-500 text-red-500 font-bold hover:border-blue-500 hover:text-blue-500 hover:underline">Send Query</button>
      </form>
    </div>
  )
}

export default Contact