import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../index.css'
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/register', { name, email, password }, { withCredentials: true })

            console.log(data)

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

            setName('')
            setEmail('')
            setPassword('')
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
            console.error(error)
        }
    }
    return (
        <div className='block mx-auto my-4 w-full md:w-4/5'>
            <form method='post' className='p-4 my-4 flex items-center justify-center flex-col shadow-lg'>
                <h2 className='my-2 text-2xl text-center font-bold'>Create An Account!</h2>
                <input type="name" onChange={(e) => setName(e.target.value)} className='px-4 py-2 my-2 w-full md:w-1/2 border-2 rounded-md' name='name' placeholder='Enter Name:' />
                <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 my-2 w-full md:w-1/2 border-2 rounded-md' placeholder='Enter Email:' />
                <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} className='px-4 py-2 my-2 w-full md:w-1/2 border-2 rounded-md' placeholder='Enter Password:' />
                <button onClick={handleSignup} className='px-4 py-2 my-2 w-full md:w-1/4 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold'>Signup</button>
                <span className='my-1 font-semibold underline'>OR</span>
                <button onClick={()=>navigate('/login')} className='px-4 py-2 my-2 w-full md:w-1/4 bg-white text-blue-500 border-2 rounded-md hover:border-blue-500 underline font-bold'><Link to={'/login'}>Login</Link></button>
            </form>
        </div>
    )
}

export default Signup