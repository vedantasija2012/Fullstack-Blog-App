import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../index.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setIsAuthenticated} = useContext(Context)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', { email, password }, { withCredentials: true })

            console.log(response.data)
            setIsAuthenticated(true)
            toast.success(`${response.data.message}`, {
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
            
            setEmail("")
            setPassword("")
        } catch (error) {
            console.error(error)
            setIsAuthenticated(false)
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
        <div className='block mx-auto my-4 w-full md:w-4/5'>
            <form method='post' className='p-4 my-4 flex items-center justify-center flex-col shadow-lg'>
                <h2 className='my-2 text-2xl text-center font-bold'>Login to your Account!</h2>
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 my-2 w-full md:w-1/2 border-2 rounded-md' placeholder='Enter Email: ' />
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='px-4 py-2 my-2 w-full md:w-1/2 border-2 rounded-md' placeholder='Enter Password: ' />
                <button onClick={handleLogin} className='px-4 py-2 my-2 w-full md:w-1/4 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold'>Login</button>
                <span className='my-1 font-bold underline'>OR</span>
                <button onClick={()=>navigate('/signup')} className='px-4 py-2 my-2 w-full md:w-1/4 bg-white text-blue-500 border-2 rounded-md hover:border-blue-500 underline font-bold'><Link to={'/signup'}>Signup</Link></button>

            </form>
        </div>
    )
}

export default Login