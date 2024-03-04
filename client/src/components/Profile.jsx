import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/logout', null, { withCredentials: true });
            setName('')
            setEmail('')
            navigate('/login')
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/v1/profile', { withCredentials: true })
                console.log(data)
                setName(data.user.name)
                setEmail(data.user.email)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchUserData()
    }, [])
    return (
        <div className='w-full md:w-4/5 shadow-xl block mx-auto my-4'>
            {
                loading ? <Loader /> : (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='hover:border-black font-bold border-2 px-4 py-2 my-2 rounded-md w-full md:w-1/2'>{name}</div>
                        <div className='hover:border-black font-bold border-2 px-4 py-2 my-2 rounded-md w-full md:w-1/2'>{email}</div>
                        <button onClick={handleLogout} className='px-4 py-2 my-2 w-full md:w-1/5 bg-white text-black border-2 rounded-md hover:border-black hover:underline font-bold'>Logout</button>
                    </div>
                )
            }
        </div>
    )
}

export default Profile