import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../index.js'
import { AiOutlineUser } from 'react-icons/ai'

const Header = () => {
  const {isAuthenticated} = useContext(Context)
  return (
    <nav className='p-8 bg-black text-white flex justify-between'>
      <div><Link to={'/'} className='font-bold hover:underline'>Blogify</Link></div>
      <ul className='flex justify-start md:justify-center md:items-center font-bold'>
        <li className='mx-2 md:px-6'><Link to={'/about'} className='hover:underline'>About</Link></li>
        <li className='mx-2 md:px-6'><Link to={'/contact'} className='hover:underline'>Contact</Link></li>
        <li className='mx-2 md:px-6'><Link to={'/blogs'} className='hover:underline'>Blogs</Link></li>
        {
          isAuthenticated ? <li className='mx-2 md:px-6'><Link to={'/my-blogs'} className='hover:underline'>My Blogs</Link></li> : ''
        }
      </ul>
      <div>
        {
          isAuthenticated ? <Link to={'/profile'}><AiOutlineUser className='text-3xl block border-2 border-white cursor-pointer float-right mx-2 font-bold rounded-3xl' /></Link> : <Link to={'/login'} className='font-bold hover:underline'>Login</Link>
        }
        </div>
      {/* <div><input type="search" name='search' className='font-semibold px-1 rounded-sm' placeholder='Search Blogs:' /></div> */}
    </nav>
  )
}

export default Header