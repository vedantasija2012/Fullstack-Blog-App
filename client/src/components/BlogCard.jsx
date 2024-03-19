import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { useContext } from 'react';
import { Context } from '../index.js';

function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    else {
        return text.substring(0, maxLength) + "...";
    }
}

const BlogCard = ({ image, title, description, blogID, isOwner, onDelete, username, createdAt }) => {
    const maxTitleLength = 25
    const shortenTitle = shortenText(title, maxTitleLength)
    const maxDescriptionLength = 50
    const shortenDescription = shortenText(description, maxDescriptionLength)
    const titleUrlRegex = /\s+/g
    const {isAuthenticated} = useContext(Context);
    const navigate = useNavigate()

    return (
        <div className='m-2 flex justify-center items-center'>
            <div className="blog border-2 px-6 py-4 my-3 rounded-sm shadow-2xl w-full transform transition-transform hover:scale-105 duration-500">
                <Link to={`/blog/${title.replace(titleUrlRegex, "-")}/${blogID}`}>
                    <div className="info my-2">
                        {/* convert 'username' to 'Username' */}
                        <p className="text-xs text-blue-500 mt-1"><strong><AiOutlineUser className='inline mr-1 font-bold text-2xl border-2 border-blue-500 rounded-full' /> {username.charAt(0).toUpperCase() + username.slice(1)}</strong></p>
                        <p className="text-xs text-gray-600 mt-1"><strong>Date Created: {new Date(createdAt).toLocaleString()}</strong></p>
                    </div>
                    <img className='w-full h-[30vh] object-cover' src={image} alt="Image Not Loaded!" />
                    <h3 className='my-2 text-lg'><b>Title</b>: {shortenTitle}</h3>
                    <p className='my-2 text-lg'><b>Description</b>: {shortenDescription}</p>
                </Link>
                {
                    isOwner && 
                <div className='p-2 flex justify-end items-center'>
                    <span className='text-xs text-red-500 font-semibold'>23</span>
                    <button className='ml-1 mr-2 text-red-600 font-bold text-lg' onClick={() => console.log("Clicked")}>
                        <AiOutlineHeart />
                    </button>
                    <button className='mx-2 text-red-600 font-bold text-lg'>
                        <Link to={isAuthenticated?`/update/${blogID}`:navigate('/login')}><AiOutlineEdit /></Link>
                    </button>
                    <button className='mx-2 text-red-600 font-bold text-lg' onClick={onDelete}>
                        <AiOutlineDelete />
                    </button>
                </div>
                }
            </div>
        </div>
    )
}

export default BlogCard